const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require('./routes/userRouter');
const bannerRouter = require('./routes/bannerRouter')

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.use(bodyParser.urlencoded({extended: true}));
app.use("/", userRouter)
app.use("/", bannerRouter)


app.listen(3001, () => {
    console.log ("Server work")
});