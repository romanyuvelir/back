const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const {sign, authenticate} = require("./midlewares/sign_ver_jwt_token");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.json({message : "239746yt23780rg43b"})
});

//user
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

//admin

const Admin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ type: 'Forbidden', msg: 'Only administrators can access this route' });
    }
    next();
};

app.post('/api/admin/resource', authenticate, Admin, (req, res) => {
    const { data } = req.body;
    if (!data) {
        return res.status(400).json({ error: 'Data is required' });
    }
    res.status(201).json({ message: 'Resource created by admin', data });
});

app.delete('/api/admin/resource/:id', authenticate, Admin, (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Resource with ID ${id} deleted by admin` });
});

app.put('/api/admin/resource/:id', authenticate, Admin, (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    if (!data) {
        return res.status(400).json({ error: 'Data is required' });
    }
    res.status(200).json({ message: `Resource with ID ${id} updated by admin`, data });
});

app.get('/api/verify', (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1] || '';
    try {
        const decoded = authenticate(req, res, next)
        res.status(200).json({
            data: decoded
        })
    } catch(err){
        res.status(401).json({
            message: 'Invalid token'
        })
    }
})

app.listen(3001, () => {
    console.log ("Server work")
});