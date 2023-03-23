const HttpError = require("../models/http-error");
const Sarjas = require("../models/Sarja");
const mongoose = require("mongoose");

const createdSarja = async (req, res, next) => {
    const { Sarjanimi, Kustantaja, Kuvaus, Luokittelu,sarjaid,image } = req.body;

    const newid = new mongoose.Types.ObjectId().toHexString();
    const createdSarja = new Users({ //muuta sarjalla tiedot
        Sarjanimi: Sarjanimi,
        Kustantaja: Kustantaja,
        Kuvaus: Kuvaus,
        Luokittelu: Luokittelu,
        sarjaid:sarjaid,
        _id: newid,
        image: image,
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

const DeleteSarjas = async (req, res, next) => {
    const sarjaid = req.params._id;
    console.log(`Received delete request for kirja with id: ${sarjaid}`);
    let sarja;
    try {
        sarja = await Sarjas.findById(sarjaid);
        console.log(`Found kirja: ${JSON.stringify(sarja)}`);
    } catch (err) {
        console.log(`Error finding kirja with id ${sarjaid}: ${err}`);
        const error = new HttpError('Could not delete kirja', 500);
        return next(error);
    }
    if (!sarja) {
        const error = new HttpError('Could not find that kirja', 404);
        return next(error);
    }
    try {
        console.log(`Deleting kirja with id: ${sarja._id}`);
        await Sarjas.deleteOne({ _id: sarjaid })
        console.log(`Kirja with id ${sarja._id} deleted successfully`);
    } catch (err) {
        console.log(`Error deleting kirja with id ${sarjaid}: ${err}`);
        const error = new HttpError('Could not delete kirja', 500);
        return next(error);
    }

    res.status(200).json({ message: 'Deleted sarja' });
}
exports.DeleteSarjas = DeleteSarjas;
exports.createdSarja = createdSarja;
exports.getAllSarjas = getAllSarjas;