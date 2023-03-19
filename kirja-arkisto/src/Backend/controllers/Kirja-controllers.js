const HttpError = require("../models/http-error");
const Kirjas = require("../models/Kirja");
const mongoose = require("mongoose");

const createdKirja = async (req, res, next) => {
    const { title, author, published, page, image,sarjaid } = req.body;

    const newid = new mongoose.Types.ObjectId().toHexString();
    const createdKirja = new Kirjas({ //muuta kirja tiedot
        _id: newid,
        title: title,
        author: author,
        published: published,
        pages: page,
        image: image,
        sarjaid: sarjaid,
    });
    console.log("serverin päässä saa",createdKirja);
    try {
        console.log(createdKirja);
        await createdKirja.save();
    } catch (err) {
        const error = new HttpError("Could not create user", 500);
        return next(error);
    }
    res.status(201).json(createdKirja);
};
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