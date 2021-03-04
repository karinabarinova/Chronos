const sendEmail = require('./send-email')

async function sendNotificationEmail(event) {
    let message =  `<p>Updated event: ${event.title}</p>
                    <p>Start: ${event.start}</p>
                    <p>Description: ${event.description}</p>`

    await sendEmail({
        to: event.participants,
        subject: 'Chronos Notification - Updated Event',
        html: `<h4>Updated event: ${event.title}</h4>
               ${message}`
    });
}

module.exports = sendNotificationEmail;
