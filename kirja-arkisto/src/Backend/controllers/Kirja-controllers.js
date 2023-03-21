const HttpError = require("../models/http-error");
const Kirjas = require("../models/Kirja");
const mongoose = require("mongoose");

const createdKirja = async (req, res, next) => {
    const { title, author, published, page, image, sarjaid } = req.body;

    try {
        const newid = new mongoose.Types.ObjectId().toHexString();
        const createdKirja = new Kirjas({ //muuta kirja tiedot
            _id: newid,
            title: title,
            author: author,
            published: published,
            sivut: page,
            image: image,
            sarjaid: sarjaid,
        });

        console.log("serverin päässä saa", createdKirja);

        // Save the new kirja to the database
        await createdKirja.save();

        res.status(201).json(createdKirja);
    } catch (err) {
        console.error(err);
        const error = new HttpError("Could not create kirja. Please try again later.", 500);
        return next(error);
    }
};
const deleteKirjas = async (req, res, next) => {
    const kirjaId = req.params._id;
    console.log(`Received delete request for kirja with id: ${kirjaId}`);
    let kirja;
    try {
        kirja = await Kirjas.findById(kirjaId);
        console.log(`Found kirja: ${JSON.stringify(kirja)}`);
    } catch (err) {
        console.log(`Error finding kirja with id ${kirjaId}: ${err}`);
        const error = new HttpError('Could not delete kirja', 500);
        return next(error);
    }
    if (!kirja) {
        const error = new HttpError('Could not find that kirja', 404);
        return next(error);
    }
    try {
        console.log(`Deleting kirja with id: ${kirja._id}`);
        await Kirjas.deleteOne({ _id: kirjaId })
        console.log(`Kirja with id ${kirja._id} deleted successfully`);
    } catch (err) {
        console.log(`Error deleting kirja with id ${kirjaId}: ${err}`);
        const error = new HttpError('Could not delete kirja', 500);
        return next(error);
    }

    res.status(200).json({ message: 'Deleted kirja' });
}
const getAllKirjas = async (req, res, next) => {
    let Kirja;
    try {
        Kirja = await Kirjas.find();
    } catch (err) {
        const error = new HttpError("Err", 418);
        return next(error);
    }
    console.log(Kirja);
    if (!Kirja || Kirja.length == 0) {
        const error = new HttpError("Not found", 404);
        return next(error);
    }
    res.json(Kirja);
};
exports.createdKirja = createdKirja;
exports.getAllKirjas = getAllKirjas;
exports.deleteKirjas = deleteKirjas;