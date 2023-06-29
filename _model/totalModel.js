// _models/Total.js
const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Total = sequelize.define('Total', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        total_hours: {
            type: DataTypes.TIME,
            allowNull: false,
        },
    });

    return Total;
};
