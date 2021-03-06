require('rootpath')()
const express = require('express')
const app = express()
const cron = require('node-cron');
const cors = require('cors')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error-handler');
const notificationCron = require('./helpers/cron');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

app.use('/api/users', require('./controllers/user.controller'))
app.use('/api/auth', require('./controllers/auth.controller'))
app.use('/api/calendars', require('./controllers/calendar.controller'))
app.use('/api/events', require('./controllers/events.controller'))
//global error handler
app.use(errorHandler)

cron.schedule('* * * * *', async function() {
    await notificationCron();
});
//start server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))