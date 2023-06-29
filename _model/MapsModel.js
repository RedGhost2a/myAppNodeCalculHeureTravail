// _models/Maps.js
const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Maps = sequelize.define('Maps', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
    });

    return Maps;
};
