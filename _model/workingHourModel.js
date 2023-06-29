// _models/Hour.js
const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Hour = sequelize.define('Hour', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        start_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        end_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        pause_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        extra_hours: {
            type: DataTypes.TIME,
            allowNull: true,
        },
    });

    return Hour;
};
