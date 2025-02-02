const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');

const dbconnection = express();
dbconnection.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MySQL',
});

connection.connect((err) => {
    if(err) throw new Error(err);
    console.log("Connected");
    connection.query("CREATE DATABASE IF NOT EXISTS db", (err) => {
        if(err) throw new Error(err);
        console.log("Db created");
    })
});

dbconnection.listen(3001)