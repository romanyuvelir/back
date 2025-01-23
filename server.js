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

app.get('/api/token', (req, res) => {
    const payload = {
        name: 'Roma'
    }
    const token = sign(res);
    res.status(200).json({
        token
    })
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