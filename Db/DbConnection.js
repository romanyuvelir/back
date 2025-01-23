const mysql = require("mysql2");
const dbConfig = require("Crud_API\app\Db\db.config.js");

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
});

connection.connect(err => {
    if(err) throw error;
    console.log("Works");
})

module.exports = connection;