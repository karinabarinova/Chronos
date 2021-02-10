const db = require('../helpers/db');

module.exports = {
    getAll,
    getById,
    // getAllEvents,
    create,
    update,
    delete: _delete
};

async function getAll(creator) {
    const calendars = await db.Calendar.findAll( {where: { creator }} )
    return calendars
}

async function getById(id, creator) {
    const calendar = await getCalendar(id)
    if (calendar.creator === creator)
        return calendar
    throw 'Calendar not found'
}

async function getAllEvents(id) {
    await getCalendar(id)
    const events = await db.Calendar.findAll({ 
        where: {id},
        attributes: [],
        include: [{
            model: db.Events,
            as: 'events',
            through: {
                attributes: []
            }
        }]
    })
    // console.log(posts[0].posts)
    return events[0].events
}

async function create(params, creator) {
    params.canDelete = true;
    params.canHide = true;
    params.creator = creator;
    const exists = await db.Calendar.findOne({ where: {name: params.name}})
    if (exists)
        throw 'Calendar already exists'
    return await db.Calendar.create(params);
}

async function update(params, id) {
    const exists = await db.Calendar.findOne({ where: {name: params.name}})
    if (exists)
        throw 'Calendar already exists'
    const calendar = await getCalendar(id);

    Object.assign(calendar, params);
    await calendar.save();

    return calendar.get()
}

async function _delete(id) {
    const calendar = await getCalendar(id);
    await calendar.destroy();

}

//helper functions
async function getCalendar(id) {
    const calendar = await db.Calendar.findByPk(id);
    if (!calendar) throw 'Calendar not found';
    return calendar;
}
