const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

db.connect(err => {
    if (err) {
        console.error('Ошибка подключения к БД:', err);
    } else {
        console.log('Подключено к MySQL');
    }
});

db.query(`CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
)`, (err) => {
    if (err) console.error('Ошибка при создании таблицы:', err);
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Все поля обязательны' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query('INSERT INTO users (username, password) VALUES (?, ?)', 
            [username, hashedPassword], 
            (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'Ошибка при сохранении пользователя' });
                }
                res.status(201).json({ message: 'Пользователь зарегистрирован' });
            }
        );
    } catch (err) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});