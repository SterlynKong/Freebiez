// requirements
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// declare that Comment inherits from the sequlize Model object
class Image extends Model { }

// define structure of Comment
Image.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        data: {
            type: DataTypes.BLOB,
            allowNull: false
        }
    },
    {
        sequelize
    }
);


module.exports = Image;