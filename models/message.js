const {Model, DataTypes} = require('sequelize');
const sequelize = require('../lib/sequelize')

class Message extends Model {}

Message.init({
    ts: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Message',
    timestamps: false
});

Message.sync();

module.exports = Message