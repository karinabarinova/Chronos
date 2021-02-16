require('rootpath')()
const express = require('express')
const app = express()
const cron = require('node-cron');
const cors = require('cors')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error-handler');
const db = require('./helpers/db');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

app.use('/api/users', require('./controllers/user.controller'))
app.use('/api/auth', require('./controllers/auth.controller'))
app.use('/api/calendars', require('./controllers/calendar.controller'))
app.use('/api/event', require('./controllers/events.controller'))
//global error handler
app.use(errorHandler)

const findDifference = (date) => {
    const now = new Date(Date.now())
    const start = new Date(date)
    let findDiff = (start.getTime() - now.getTime()) / 1000;
    findDiff /= 60;
    return Math.abs(Math.round(findDiff));
}

cron.schedule('* * * * *', async function() {
    const events = await db.Events.findAll( {where: {requireReminder: true, reminderSent: false }} )
    if (events) {
        events.forEach(event => {
            const diff = findDifference(event.dataValues.start)
            if (diff <= 20) //if event is in less than 20 minutes
                console.log('It is time to send some notifications');
        })
    }
});
//start server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))