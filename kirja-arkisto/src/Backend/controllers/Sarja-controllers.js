const HttpError = require("../models/http-error");
const Sarjas = require("../models/Sarja");
const mongoose = require("mongoose");

const createdSarja = async (req, res, next) => {
    const { Sarjanimi, Kustantaja, Kuvaus, Luokittelu, sarjaid, image } = req.body;

    const newid = new mongoose.Types.ObjectId().toHexString();
    const createdSarja = new Users({ //muuta sarjalla tiedot
        Sarjanimi: Sarjanimi,
        Kustantaja: Kustantaja,
        Kuvaus: Kuvaus,
        Luokittelu: Luokittelu,
        sarjaid: sarjaid,
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

const updateSarjaById = async (req, res, next) => {
    const { Sarjanimi, Kustantaja, Kuvaus, Luokittelu, image } = req.body;
    const sarjaID = req.params._id;

    try {
        const sarja = await Sarjas.findById(sarjaID);

        if (sarja) {
            const existingSarja = await Sarjas.findOne({
                $and: [{ _id: { $ne: sarjaID } }, { $or: [{ Sarjanimi }] }],
            });
            if (existingSarja) {
                const error = new HttpError(
                    "Käyttäjänimi tai sähköposti on jo käytössä",
                    422
                );
                return next(error);
            }

            sarja.Sarjanimi = Sarjanimi;
            sarja.Kustantaja = Kustantaja;
            sarja.Kuvaus = Kuvaus;
            sarja.Luokittelu = Luokittelu;
            sarja.image = image;

            await sarja.save();
            console.log(sarja, "Käyttäjä päivitetty");

            res.json({ Sarjas: sarja.toObject({ getters: true }) });
        } else {
            const error = new HttpError("Käyttäjää ei löydetty", 404);
            return next(error);
        }
    } catch (err) {
        console.log(err);
        const error = new HttpError("Server error", 500);
        return next(error);
    }
};
exports.DeleteSarjas = DeleteSarjas;
exports.createdSarja = createdSarja;
exports.getAllSarjas = getAllSarjas;
exports.updateSarjaById = updateSarjaById;