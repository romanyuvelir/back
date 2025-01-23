const dotenv = require('dotenv');

module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "MySQL",
    DB: "db"
  };

  module.exports = {
    PORT: process.env.PORT || 3001,
    DB: {
        PORT: process.env.DB_PORT,
        NAME: process.env.DB_NAME,
        HOST: process.env.DB_HOST,
        USER_NAME: process.env.DB_USERNAME,
        PASSWORD: process.env.DB_PASSWORD 
    }
}