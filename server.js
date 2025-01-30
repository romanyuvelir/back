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

app.listen(3001, () => {
    console.log ("Server work")
});