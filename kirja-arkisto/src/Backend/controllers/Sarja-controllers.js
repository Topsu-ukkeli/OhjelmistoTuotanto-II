const HttpError = require("../models/http-error");
const Sarjas = require("../models/Sarja");
const mongoose = require("mongoose");

const createdSarja = async (req, res, next) => {
    const { Sarjanimi, Kustantaja, Kuvaus, Luokittelu } = req.body;

    const newid = new mongoose.Types.ObjectId().toHexString();
    const createdSarja = new Users({ //muuta sarjalla tiedot
        Sarjanimi: Sarjanimi,
        Kustantaja: Kustantaja,
        Kuvaus: Kuvaus,
        Luokittelu: Luokittelu,
        _id: newid,
    });
    try {
        console.log(createdSarja);
        await createdSarja.save();
    } catch (err) {
        const error = new HttpError("Could not create user", 500);
        return next(error);
    }
    res.status(201).json(createdSarja);
};
const getAllSarjas = async (req, res, next) => {
    let Sarja;
    try {
        Sarja = await Sarjas.find();
    } catch (err) {
        const error = new HttpError("Err", 418);
        return next(error);
    }
    console.log(Sarja);
    if (!Sarja || Sarja.length == 0) {
        const error = new HttpError("Not found", 404);
        return next(error);
    }
    res.json(Sarja);
};
exports.createdSarja = createdSarja;
exports.getAllSarjas = getAllSarjas;