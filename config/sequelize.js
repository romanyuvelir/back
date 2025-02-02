const { Sequelize } = require('sequelize');
const dbConfig = require('./config');

const sequelize = new Sequelize(dbConfig.DB.NAME, dbConfig.DB.USER, dbConfig.DB.PASSWORD, {
    host: dbConfig.DB.HOST,
    dialect: dbConfig.DB.dialect,
    pool: dbConfig.sequelizeConfig.development.pool,
});

sequelize.authenticate()
    .then(() => {
        console.log('Db connection is done');
    })
    .catch(err => {
        console.log('Db connection ERROR: ', err);
    });

module.exports = sequelize;
