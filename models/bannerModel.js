const {Sequelize, DataTypes, Model} = require('sequelize');
const sequelize = require('../config/sequelize');

const Banner = sequelize.define('Banner', {
    bannerFileName: {
        type: DataTypes.String(64),
        allowNull: false,
    },
    bannerLink: {
        type: DataTypes.String(128),
        allowNull: false,
    }
}, {
    tableName: 'banners',
    timestamps: false,
});

module.exports = Banner;