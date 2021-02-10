const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        userId: {type: DataTypes.INTEGER},
        CalendarId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Calendars',
                key: "Id"
            }
        },
        email: {type: DataTypes.STRING}
    };

    const options = {
        timestamps: false
    };

    return sequelize.define('participants', attributes, options);
}