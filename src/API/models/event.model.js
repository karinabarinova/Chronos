const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        },
        CalendarId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        defaultDuration: {
            type: DataTypes.STRING,
            allowNull: false
        },
        startTime: {
            type: DataTypes.DATE
        },
        endTime: {
            type: DataTypes.DATE
        },
        participants: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        }
    }

    return sequelize.define('Event', attributes, {});
}