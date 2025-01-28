const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MySQL',
});

connection.connect((err) => {
    if(err) throw new Error(err);
    console.log("Connected");
    connection.query("CREATE DATABASE mydb", (err) => {
        if(err) throw new Error(err);
        console.log("Db created");
    })
});

app.listen(3000)