const HttpError = require("../models/http-error");
const OmaKirjastos = require("../models/Omakirjasto");
const mongoose = require("mongoose");
const Omakirjasto = require("../models/Omakirjasto");

const createdOmakirjasto = async (req, res, next) => {
    const { title, author, published, page, image, sarjaid ,UserID} = req.body;
    try {
        const newid = new mongoose.Types.ObjectId().toHexString();
        const createdomakirjasto = new OmaKirjastos({ //muuta kirja tiedot
            _id: newid,
            title: title,
            author: author,
            published: published,
            // sivut: page,
            image: image,
            sarjaid: sarjaid,
            UserID: UserID,
        });
        console.log("userid on",UserID);
        console.log("serverin päässä saa", createdomakirjasto);

        // Save the new kirja to the database
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
const getOmakirjasto = async (req, res, next) => {
    let OmaKirjasto;
    try {
        OmaKirjasto = await OmaKirjastos.find();
    } catch (err) {
        const error = new HttpError("Err", 418);
        return next(error);
    }
    if (!OmaKirjasto || OmaKirjasto.length == 0) {
        const error = new HttpError("Not found", 404);
        return next(error);
    }
    res.json(OmaKirjasto);
};

const getOmakirjastoById = async(req,res,next) => {
    const UserID = req.params._id;
    let omakirjasto;
    try{
        omakirjasto = await OmaKirjastos.find({UserID});
        console.log(omakirjasto);
    }catch (err) {

        return next(err);
    }
    res.json(omakirjasto);


}
exports.createdOmakirjasto = createdOmakirjasto;
exports.getOmakirjasto = getOmakirjasto;
exports.getOmakirjastoById = getOmakirjastoById;