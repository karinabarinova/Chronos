const db = require('../helpers/db');
const sendNotification = require('../helpers/newEvent');

module.exports = {
    getAll,
    getById,
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

async function create(params, creator) {
    const fullParams = {
        ...params,
        canDelete: true,
        canHide: true,
        hide: false,
        creator
    }
    const exists = await db.Calendar.findOne({ where: {name: fullParams.name}})
    if (exists)
        throw 'Calendar already exists'
    if (fullParams.participants)
        sendNotification.sendNewCalendar(fullParams);
    return await db.Calendar.create(fullParams);
}

async function update(params, id, creator) {
    const calendar = await getCalendar(id);
    console.log(calendar)
    console.log(params)
    if (calendar.creator === creator) {
        Object.assign(calendar, params);
        await calendar.save();
    
        return calendar.get()
    }
    throw 'Unauthorized'
}

async function _delete(id, creator) {
    const calendar = await getCalendar(id);
    if (calendar.creator === creator)
        await calendar.destroy();
    else
        throw 'Unauthorized'

}

//helper functions
async function getCalendar(id) {
    const calendar = await db.Calendar.findByPk(id);
    if (!calendar) throw 'Calendar not found';
    return calendar;
}
