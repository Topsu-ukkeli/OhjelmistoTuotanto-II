const multer = require('multer');
const path = require('path');
const fs = require('fs');

const HttpError = require("../models/http-error");
const Kirjas = require("../models/Kirja");
const mongoose = require("mongoose");


const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../../public"));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${uniqueSuffix}.png`);
    },
});

const fileFilter = (req, file, callback) => {
	const extension = path.extname(file.originalname).toLowerCase();
	if (![".png", ".jpg", ".jpeg", ".gif", ".pdf"].includes(extension)) {
		return callback(
			new Error(
				`Extension not allowed, accepted extensions are .png, .jpg, .jpeg, .gif, .pdf`
			)
		);
	}
	callback(null, true);
};

const LetterBomb = multer({
    storage: Storage,
    limits: { fileSize: 8 * 1024 * 1024 },
    fileFilter,
});

const createKirja = async (req, res, next) => {
    LetterBomb.single("image")(req, res, async function (err) {
        if (err) {
            console.error("Error:", err);
            return res.status(500).json({ message: "Virhe.", err });
        } else {
            const file = req.file;
            console.log(file);

            const { title, author, published, page, sarjaid,kuvaus, piirtajat } = req.body;

            const newid = new mongoose.Types.ObjectId().toHexString();

            const createdKirja = new Kirjas({
                _id: newid,
                title: title,
                author: author,
                published: published,
                page: page,
                image: file.path,
                sarjaid: sarjaid,
                kuvaus:kuvaus,
                piirtajat: piirtajat
            });

            try {
                await createdKirja.save();
            }
            catch (err) {
                const error = new HttpError("Virhe", 500);
                return next(error);
            }
        }
    });
};

const getKirjaById = async (req, res, next) => {
    const kirjaId = req.params._id;
    console.log(`Received get request for kirja with id: ${kirjaId}`);
    let kirja;
    try {
        kirja = await Kirjas.findById(kirjaId);
        console.log(`Found kirja: ${JSON.stringify(kirja)}`);
    } catch (err) {
        console.log(`Error finding kirja with id ${kirjaId}: ${err}`);
        const error = new HttpError('Could not find kirja', 500);
        return next(error);
    }
    if (!kirja) {
        const error = new HttpError('Could not find that kirja', 404);
        return next(error);
    }
    res.json(kirja);
};
const getKirjaBySarjaid = async (req, res, next) => {
    const sarjaid = req.params.sarjaid;
    if (!sarjaid) {
        const error = new HttpError('Invalid sarjaid parameter', 400);
        return next(error);
    }
    console.log(`Received get request for kirja with sarjaid: ${sarjaid}`);
    let kirja;
    try {
        kirja = await Kirjas.find({"sarjaid": sarjaid});
        console.log(`Found kirja: ${JSON.stringify(kirja)}`);
    } catch (err) {
        console.log(`Error finding kirja with sarjaid ${sarjaid}: ${err}`);
        const error = new HttpError('Could not find kirja', 500);
        return next(error);
    }
    if (!kirja || kirja.length === 0) {
        const error = new HttpError('Could not find kirja with that sarjaid', 404);
        return next(error);
    }
    res.json(kirja);
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
    if (!Kirja || Kirja.length == 0) {
        const error = new HttpError("Not found", 404);
        return next(error);
    }
    res.json(Kirja);
};

const updateKirjaById = async (req, res, next) => {
    const { title, author, published, page, sarjaid } = req.body;
    const kirjasID = req.params._id;

    try {
        const kirjas = await Kirjas.findById(kirjasID);

        if (kirjas) {
            const existingKirja = await Kirjas.findOne({
                $and: [{ _id: { $ne: kirjasID } }, { $or: [{ title }] }],
            });
            if (existingKirja) {
                const error = new HttpError(
                    "Käyttäjänimi tai sähköposti on jo käytössä",
                    422
                );
                return next(error);
            }
            kirjas.title = title;
            kirjas.author = author;
            kirjas.published = published;
            kirjas.page = page;
            kirjas.sarjaid = sarjaid;

            console.log("kirjas saa",kirjas);
            await kirjas.save();
            console.log(kirjas, "Käyttäjä päivitetty");

            res.json({ Kirjas: kirjas.toObject({ getters: true }) });
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

const deleteAllKirjas = async (req, res, next) => {
    try {
        await Kirjas.deleteMany({});
        res.status(200).json({ message: "Deleted all kirjas" });
    } catch (err) {
        const error = new HttpError("Server error", 500);
        return next(error);
    }
};

exports.deleteAllKirjas = deleteAllKirjas;
exports.createKirja = createKirja;
exports.getAllKirjas = getAllKirjas;
exports.deleteKirjas = deleteKirjas;
exports.updateKirjaById = updateKirjaById;
exports.getKirjaById = getKirjaById;
exports.getKirjaBySarjaid = getKirjaBySarjaid;