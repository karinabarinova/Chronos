const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        creator: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: "id"
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
        },
        canDelete: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        canHide: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        hide: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        participants: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        }
    }

    return sequelize.define('Calendar', attributes, {})
}