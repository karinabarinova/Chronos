const config = require('../config.json')
const mysql = require('mysql2/promise')
const { Sequelize } = require('sequelize');

module.exports = db = {}

initialize()

async function initialize() {
    //create db  if doesn't exist
    const { host, port, user, password, database } = config.database
    const connection = await mysql.createConnection({host, port, user, password})
    await connection.query(`CREATE DATABASE IF NOT EXISTS ??`, [database])

    //connect to db
    const sequelize = new Sequelize(database, user, password, {dialect: 'mysql', logging: console.log})
    db.User = require('../models/user.model')(sequelize)
    db.userToken = require('../models/userToken.model')(sequelize)
    db.Calendar = require('../models/calendar.model')(sequelize)
    db.Events = require('../models/event.model')(sequelize)
    db.Participants = require('../models/participants.model')(sequelize)

    //define relations
    db.User.hasMany(db.userToken, {onDelete: 'CASCADE', foreignKey: 'userId'})
    db.userToken.belongsTo(db.User, {
        foreignKey: 'userId',
        as: "user"
    })
    db.User.hasMany(db.Calendar, {
        foreignKey: 'creator',
        as: "calendars"
    });
    db.Calendar.belongsTo(db.User, {
        foreignKey: 'creator',
        as: "user"
    })
    db.Calendar.hasMany(db.Events, {
        as: 'events',
        onDelete: 'CASCADE'
    })
    db.Events.belongsTo(db.Calendar, {
        foreignKey: 'CalendarId',
        as: 'calendars'
    })
    db.Events.hasMany(db.Participants, {
        as: 'participant',
        onDelete: 'CASCADE'
    })
    db.Participants.belongsTo(db.Events, {
        foreignKey: 'EventId',
        as: "event"
    })
    db.Calendar.hasMany(db.Participants, {
        as: "participant",
        onDelete: "CASCADE"
    })
    db.Participants.belongsToMany(db.Calendar, {
        through: "calendars_participants",
        as: "calendars",
        foreignKey: "participant_id"
    })
    
    //sync all models with database
    await sequelize.sync()

}
