require('dotenv').config();
const fs = require('fs');

module.exports = {
    PORT: process.env.PORT || 3001,
    DB: {
        HOST: process.env.DB_HOST || 'localhost',
        PORT: process.env.DB_PORT || 3306,
        NAME: process.env.DB_NAME || 'db',
        USER: process.env.DB_USERNAME || 'root',
        PASSWORD: process.env.DB_PASSWORD || 'MySQL'
    }
};

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'MySQL',
    database: process.env.DB_NAME || 'db',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: process.env.TEST_DB_USERNAME || 'root',
    password: process.env.TEST_DB_PASSWORD || null,
    database: process.env.TEST_DB_NAME || 'database_test',
    host: process.env.TEST_DB_HOST || '127.0.0.1',
    port: process.env.TEST_DB_PORT || 3306,
    dialect: 'mysql',
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    port: process.env.PROD_DB_PORT || 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
      ssl: process.env.DB_SSL ? { ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt') } : undefined
    },
  },
};