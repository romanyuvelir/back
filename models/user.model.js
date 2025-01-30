const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const {sign, authenticate} = require("./midlewares/sign_ver_jwt_token");

const user = [];

module.exports = class User{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    save(){
        users.push(this);
    }
    static getALL(){
        return users;
    }
}


app.get('/api/user', authenticate, (req, res) => {
    res.status(200).json({ user: req.user });
});

app.get('/api/token', (req, res) => {
    const payload = {
        name: 'Roma'
    }
    const token = sign(res);
    res.status(200).json({
        token
    })
});

app.post('/api/resource', authenticate, (req, res) => {
    const { data } = req.body;
    if (!data) {
        return res.status(400).json({ error: 'Data is required' });
    }
    res.status(201).json({ message: 'Resource created', data });
});

app.put('/api/resource/:id', authenticate, (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    if (!data) {
        return res.status(400).json({ error: 'Data is required' });
    }
    res.status(200).json({ message: `Resource with ID ${id} updated`, data });
});

app.get('/api/resource/:id', authenticate, (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Resource with ID ${id} found`, data: { id, name: 'Example Resource' } });
});

app.get('/api/token/:role', (req, res) => {
    const { role } = req.params;
    const validRoles = ['admin', 'user'];
    if (!validRoles.includes(role)) {
        return res.status(400).json({ error: 'Invalid role' });
    }
    const token = sign({ role }, res);
    res.status(200).json({ token });
});