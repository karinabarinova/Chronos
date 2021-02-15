const config = require('../config.json')
const jwt = require('jsonwebtoken');
const geoip = require('geoip-lite');
const bcrypt = require('bcryptjs');
const crypto = require('crypto')
const { Op } = require('sequelize')
const sendEmail = require('../helpers/send-email')
const db = require('../helpers/db');
const Role = require('../helpers/role')

const { HolidayAPI } = require('holidayapi') ;
const key = 'de4c4bc0-ac21-4f73-95ef-9935d5aad3bd';
const holidayApi = new HolidayAPI({ key });
// const HolidayAPI = require('holidayapi-node');
// const hApi = new HolidayAPI("de4c4bc0-ac21-4f73-95ef-9935d5aad3bd").v1

module.exports = {
    authenticate,
    register,
    verifyEmail,
    forgotPassword,
    resetPassword,
    logOut
};

async function authenticate({ login, email, password, ipAddress }) {
    const user = await db.User.scope('withHash').findOne({ where: { email: email.toLowerCase(), login: login.toLowerCase() } });

    if (!user || !user.isVerified || !(await bcrypt.compare(password, user.hash))) {
        throw 'Email or password is incorrect';
    }

    // authentication successful so generate jwt and token
    const jwtToken = generateJwtToken(user);
    const tokenRow = new db.userToken({
        userId: user.id,
        token: jwtToken,
        expires: new Date(Date.now() + 1*24*60*60*1000), //1 day
        createdByIp: ipAddress
    });
    await tokenRow.save()
    return {
        ...basicDetails(user),
        jwtToken,
        expiresIn: 3600*24
    };
}

async function register(params, origin) {
    // validate
    if (await db.User.findOne({ where: { email: params.email } })) {
        // send already registered error in email to prevent account enumeration
        await sendAlreadyRegisteredEmail(params.email, origin);
        throw "Email is already taken";
    }
    if (await db.User.findOne({ where: { login: params.login } }))
        throw "Username is already taken"
    // create account object
    const user = new db.User(params);

    // first registered account is an admin
    const isFirstAccount = (await db.User.count()) === 0;
    user.role = isFirstAccount ? Role.Admin : Role.User;
    user.verificationToken = randomTokenString();
    // hash password
    user.hash = await hash(params.password);

    // save account
    await user.save();

    // send email
    await sendVerificationEmail(user, origin);
}

async function verifyEmail({ token }, ip) {
    const user = await db.User.findOne({ where: { verificationToken: token } });

    if (!user) throw 'Verification failed';

    user.verified = Date.now();
    user.verificationToken = null;
    await user.save();
    await createDefaultCalendar(user.id, user.fullName)
    await createHolidaysCalendar(user.id, ip)
}

async function forgotPassword({ email }, origin) {
    const user = await db.User.findOne({ where: { email } });

    // always return ok response to prevent email enumeration
    if (!user) return;

    // create reset token that expires after 24 hours
    user.resetToken = randomTokenString();
    user.resetTokenExpires = new Date(Date.now() + 24*60*60*1000);
    await user.save();

    // send email
    await sendPasswordResetEmail(user, origin);
}

async function validateResetToken({ token }) {
    const user = await db.User.findOne({
        where: {
            resetToken: token,
            resetTokenExpires: { [Op.gt]: Date.now() }
        }
    });

    if (!user) throw 'Invalid token';

    return user;
}

async function resetPassword({ password, token }) {
    const user = await validateResetToken({ token });

    // update password and remove reset token
    user.hash = await hash(password);
    user.passwordReset = Date.now();
    user.resetToken = null;
    await user.save();
}

//helper functions

function generateJwtToken(user) {
    // create a jwt token containing the account id that expires in 1 hour
    return jwt.sign({ sub: user.id, id: user.id }, config.secret, { expiresIn: '1h' });
    // return jwt.sign({ sub: user.id, id: user.id }, config.secret);

}

function randomTokenString() {
    return crypto.randomBytes(40).toString('hex');
}

async function sendVerificationEmail(user, origin) {
    let message;
    if (origin) {
        const verifyUrl = `${origin}/api/auth/verify-email?token=${user.verificationToken}`;
        message = `<p>Please click the below link to verify your email address:</p>
                   <p><a href="${verifyUrl}">${verifyUrl}</a></p>`;
    } else {
        message = `<p>Please use the below token to verify your email address with the <code>/api/auth/verify-email</code> api route:</p>
                   <p><code>${user.verificationToken}</code></p>`;
    }

    await sendEmail({
        to: user.email,
        subject: 'Sign-up USOF API - Verify Email',
        html: `<h4>Verify Email</h4>
               <p>Thanks for registering!</p>
               ${message}`
    });
}

async function sendAlreadyRegisteredEmail(email, origin) {

    let message;
    if (origin) {
        message = `<p>If you don't know your password please visit the <a href="${origin}/api/auth/password-reset">forgot password</a> page.</p>`;
    } else {
        message = `<p>If you don't know your password you can reset it via the <code>/api/auth/password-reset</code> api route.</p>`;
    }

    await sendEmail({
        to: email,
        subject: 'Sign-up USOF API - Email Already Registered',
        html: `<h4>Email Already Registered</h4>
               <p>Your email <strong>${email}</strong> is already registered.</p>
               ${message}`
    });
}

async function sendPasswordResetEmail(user, origin) {
    let message = `<p>Please use the below token to reset your password with the <code>${origin}/confirm-reset-password</code> route:</p>
                   <p><code>${user.resetToken}</code></p>`;

    await sendEmail({
        to: user.email,
        subject: 'Sign-up USOF API - Reset Password',
        html: `<h4>Reset Password Email</h4>
               ${message}`
    });
}

function basicDetails(user) {
    const { id, login, email, role, created, updated, isVerified } = user;
    return { id, login, email, role, created, updated, isVerified };
}

async function hash(password) {
    return await bcrypt.hash(password, 10);
}

async function logOut(id, {token}) {
    const row = await db.userToken.findOne( {where: {UserId: id, token}})
    if (!row)
        throw "Invalid token in cookies"
    row.expires = new Date(Date.now())
    await row.save()
}

async function createDefaultCalendar(id, name) {
    const params = {
        creator: id,
        name,
        description: `${name}'s calendar`,
        color: "#4f9eb8",
        canDelete: false,
        canHide: false
    }
    const calendar = await db.Calendar.create(params);
}

async function createHolidaysCalendar(id, ip) {
    const { holidays } = await getLocationHolidays(ip);
    const params = {
        creator: id,
        name: "Holidays",
        description: `Country Holidays`,
        color: "#86bd33",
        canDelete: true,
        canHide: true
    }
    const calendar = await db.Calendar.create(params);

    holidays.forEach(async function(data) {
        const date = new Date(data.date)
        date.setFullYear(date.getFullYear() + 1);
        // const nextDay = new Date(date)
        // nextDay.setDate(nextDay.getDate() + 1);

        await db.Events.create({
            title: data.name,
            description: data.name,
            CalendarId: calendar.id,
            defaultDuration: "1 day",
            start: date,
            end: date
            })
    })
}

async function getLocationHolidays(ip) {
    var geo = null;
    const previousYear = new Date().getFullYear() - 1;

    if (ip === "::1")
        geo = geoip.lookup("94.153.64.26") //Ukraine IP
    else
        geo = geoip.lookup(ip)
    const params = {
        country: geo.country,
        year: previousYear
    }
    return await holidayApi.holidays(params);
}