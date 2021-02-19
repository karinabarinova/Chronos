const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        },
        type: {
            type: DataTypes.ENUM("arrangement", "task", "reminder", "holiday"),
            allowNull: false,
        },
        CalendarId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
        },
        requireReminder: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        reminderSent: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        defaultDuration: {
            type: DataTypes.STRING,
            allowNull: false
        },
        start: {
            type: DataTypes.DATE
        },
        end: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        participants: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        }
    }

    return sequelize.define('Event', attributes, {});
}