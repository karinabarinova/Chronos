const db = require('../helpers/db');
const sendNotification = require('../helpers/newEvent');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(creator, CalendarId) {
    const calendar = await getCalendar(CalendarId)
    if (calendar && calendar.creator === creator)
        return await db.Events.findAll( { where: {CalendarId} } )
    else
        throw 'Unauthorized'
}

async function getById(id, creator) {
    const event = await getEvent(id)
    const calendar = await getCalendar(event.CalendarId)
    if (calendar.creator === creator)
        return event
    throw 'Unauthorized'
}

async function create(params, creator, CalendarId) {
    const calendar = await getCalendar(CalendarId)
    if (calendar && calendar.creator === creator) {
        const user = await db.User.findByPk(creator);
        let participants = "";

        if (params.participants)
            participants = `${user.email} ${params.participants}`
        else
            participants = String(user.email)
        const event = await db.Events.create({ 
            ...params, 
            participants,
            CalendarId, 
            defaultDuration: "1 day",
            color: calendar.color 
        })
        
        if (params.type === "task" || params.type === "reminder") {
            event.requireReminder = true;
            event.reminderSent = false;
        }
        await event.save()
        await sendNotification.sendNewEmail(event)
        return event;
    }
    throw 'Unauthorized'
}

async function update(params, id, user) {
    const event = await getEvent(id)
    const calendar = await getCalendar(event.CalendarId)
    if (calendar.creator === user) {
        Object.assign(event, params)
        await event.save();
        if (event.participants)
            await sendNotification.sendUpdatedEmail(event)

        return event
    }
    throw 'Unauthorized'
}

async function _delete(id, creator) {
    const event = await getEvent(id)
    const calendar = await getCalendar(event.CalendarId)
    if (calendar.creator === creator)
        await event.destroy();
    else
        throw 'Unauthorized'
}

//helpers
async function getCalendar(id) {
    const calendar = await db.Calendar.findByPk(id);
    if (!calendar) throw 'Calendar not found';
    return calendar;
}

async function getEvent(id) {
    const event = await db.Events.findByPk(id);
    if (!event) throw 'Event not found';
    return event;
}
