const sendEmail = require('./send-email')
const db = require('./db');

async function sendNotificationEmail(event) {
    let message =  `<p>Don't forget you have scheduled an event in your calendar: ${event.title}
                    <p>It will start in less than 20 minutes</p>`

    await sendEmail({
        to: event.participants,
        subject: 'Chronos Notification - Upcoming Event',
        html: `<h4>Upcoming event: ${event.title}</h4>
               ${message}`
    });
}

const findDifference = (date) => {
    const now = new Date(Date.now())
    const start = new Date(date)
    let findDiff = (start.getTime() - now.getTime()) / 1000;
    findDiff /= 60;
    return Math.abs(Math.round(findDiff));
}

const notificationCron = async () => {
    const events = await db.Events.findAll( {where: {requireReminder: true, reminderSent: false }} )
    if (events) {
        events.forEach(async event => {
            const diff = findDifference(event.dataValues.start)
            if (diff <= 20) { //if event is in less than 20 minutes
                await sendNotificationEmail(event.dataValues)
                event.reminderSent = true
                await event.save()
            }
        })
    }
}

module.exports = notificationCron;
