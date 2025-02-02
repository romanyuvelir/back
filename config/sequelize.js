const { Sequelize } = require('sequelize');
const dbConfig = require('./config');

const sequelize = new Sequelize(dbConfig.development.database, dbConfig.development.username, dbConfig.development.password, {
    host: dbConfig.development.host,
    dialect: dbConfig.development.dialect,
});

sequelize.authenticate()
    .then(() => {
        console.log('Db connection is done');
    })
    .catch(err => {
        console.log('Db connection ERROR: ', err);
    });

module.exports = sequelize;
