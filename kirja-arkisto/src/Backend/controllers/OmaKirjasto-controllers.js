const HttpError = require("../models/http-error");
const OmaKirjastos = require("../models/Omakirjasto");
const mongoose = require("mongoose");

const createdOmakirjasto = async (req, res, next) => {
    const { title, author, published, page, image, sarjaid ,UserID, Kunto, Hinta,HankintaAika} = req.body;
    try {
        const newid = new mongoose.Types.ObjectId().toHexString();
        const createdomakirjasto = new OmaKirjastos({ //muuta kirja tiedot
            _id: newid,
            title: title,
            author: author,
            published: published,
            page: page,
            image: image,
            sarjaid: sarjaid,
            UserID: UserID,
            Kunto: Kunto,
            Hinta: Hinta,
            HankintaAika:HankintaAika,
        });

        // Save the new kirja to the database
        //jos tämän poistaa voi käyttäjä lisätä useamman saman kirjan itselleen
        if (await OmaKirjastos.findOne({ $and: [{ title },{UserID}] })) {
            const error = new HttpError("Löytyy jo", 422);
            return next(error);
        }
        await createdomakirjasto.save();

        res.status(201).json(createdomakirjasto);
    } catch (err) {
        console.error(err);
        const error = new HttpError("Could not create kirja. Please try again later.", 500);
        return next(error);
    }
};
const getOmakirjastoById = async(req,res,next) => {
    const UserID = req.params._id;
    let omakirjasto;
    try{
        omakirjasto = await OmaKirjastos.find({UserID});
    }catch (err) {

        return next(err);
    }
    res.json(omakirjasto);


}
const DeleteOmakirja = async (req, res, next) => {
    const omakirjaid = req.params._id;
    let omakirja;
    try {
        omakirja = await OmaKirjastos.findById(omakirjaid);
    } catch (err) {
        const error = new HttpError('Could not delete kirja', 500);
        return next(error);
    }
    if (!omakirja) {
        const error = new HttpError('Could not find that kirja', 404);
        return next(error);
    }
    try {
        await OmaKirjastos.deleteOne({ _id: omakirjaid })
    } catch (err) {
        const error = new HttpError('Could not delete kirja', 500);
        return next(error);
    }

    res.status(200).json({ message: 'Deleted omakirja' });
}
const updateOmakirjairjaById = async (req, res, next) => {
    const { Kunto, Hinta, HankintaAika} = req.body;
    const omakirjasID = req.params._id;
    try {
        const omakirjas = await OmaKirjastos.findById(omakirjasID);

        if (omakirjas) {
            const existingKirja = await OmaKirjastos.findOne({
                $and: [{ _id: { $ne: omakirjasID } }],
            });
            if (!existingKirja) {
                const error = new HttpError(
                    "Käyttäjänimi tai sähköposti on jo käytössä",
                    422
                );
                return next(error);
            }
            omakirjas.Kunto = Kunto;
            omakirjas.Hinta = Hinta;
            omakirjas.HankintaAika = HankintaAika;

            await omakirjas.save();

            res.json({ OmaKirjastos: omakirjas.toObject({ getters: true }) });
        } else {
            const error = new HttpError("Käyttäjää ei löydetty", 404);
            return next(error);
        }
    } catch (err) {
        const error = new HttpError("Server error", 500);
        return next(error);
    }
};
exports.updateOmakirjairjaById = updateOmakirjairjaById;
exports.createdOmakirjasto = createdOmakirjasto;
exports.DeleteOmakirja = DeleteOmakirja;
exports.getOmakirjastoById = getOmakirjastoById;