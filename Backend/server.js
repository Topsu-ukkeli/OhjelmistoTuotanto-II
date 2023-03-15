
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Kirja = require("./Routes/Kirja-routes");
const User = require("./Routes/User-routes");
const Sarja = require("./Routes/Sarja-routes");
const HttpError = require("./models/http-error");
const cors = require("cors");
const server = express();
mongoose.set("strictQuery", true);
server.use(bodyParser.json())
server.use(cors());
server.use("/api/Kirja", Kirja);
server.use("/api/User", User);
server.use("/api/Sarja", Sarja);
server.use(() => {
    const error = new HttpError("Pääsy evätty", 418);
    throw error;
});
server.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message ||  "Virhe!" });
});
mongoose
    .connect('mongodb+srv://onnikumpulainen:niosonto@ohjii.9lvmrke.mongodb.net/Kirja-arkisto?retryWrites=true&w=majority')
    .then(() => {
        console.log("Päästiin sisään")
        server.listen(5000);
    })
    .catch(error => {
        console.log("ei päästy sisään", error);
    })
