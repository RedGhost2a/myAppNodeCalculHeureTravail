// _models/Calendar.js
const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Calendar = sequelize.define('Calendar', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });

    return Calendar;
};
