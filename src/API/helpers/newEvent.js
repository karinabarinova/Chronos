const sendEmail = require('./send-email')

async function sendUpdatedEmail(event) {
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

async function sendNewEmail(event) {
    let message =  `<p>You have been added to new event: ${event.title}</p>
                    <p>Start: ${event.start}</p>
                    <p>Description: ${event.description}</p>`

    await sendEmail({
        to: event.participants,
        subject: 'Chronos Notification - New Event',
        html: `<h4>New event: ${event.title}</h4>
               ${message}`
    });
}


module.exports = {
    sendUpdatedEmail,
    sendNewEmail
};
