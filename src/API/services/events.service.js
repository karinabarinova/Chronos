const db = require('../helpers/db');

module.exports = {
    getAll,
    // getById,
    create,
    // update,
    // delete: _delete
};

async function getAll(creator, CalendarId) {
    const calendar = await getCalendar(CalendarId)
    if (calendar && calendar.creator === creator)
        return await db.Events.findAll( { where: {CalendarId} } )
    else
        throw 'Unauthorized'
}

async function create(params, creator, CalendarId) {
    const calendar = await getCalendar(CalendarId)
    if (calendar && calendar.creator === creator)
        return await db.Events.create({ ...params, CalendarId, defaultDuration: "1 day" })
    throw 'Unauthorized'
}

//helpers
async function getCalendar(id) {
    const calendar = await db.Calendar.findByPk(id);
    if (!calendar) throw 'Calendar not found';
    return calendar;
}
