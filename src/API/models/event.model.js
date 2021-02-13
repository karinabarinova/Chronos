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
        CalendarId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        defaultDuration: {
            type: DataTypes.STRING,
            allowNull: false
        },
        start: {
            type: DataTypes.DATE
        },
        end: {
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