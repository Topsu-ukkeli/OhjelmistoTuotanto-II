const multer = require('multer');
const path = require('path');
const fs = require('fs');


const HttpError = require("../models/http-error");
const Sarjas = require("../models/Sarja");
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

const createdSarja = async (req, res, next) => {
    LetterBomb.single("image")(req, res, async function (err) {
        if (err) {
            console.error("Error:", err);
            return res.status(500).json({ message: "Virhe.", err });
        } else {
            const file = req.file;
            console.log(file);

            const { Sarjanimi, Kustantaja, Kuvaus, Luokittelu, sarjaid } = req.body;

            const newid = new mongoose.Types.ObjectId().toHexString();

            const createdSarja = new Sarjas({
                _id: newid,
                Sarjanimi: Sarjanimi,
                Kustantaja: Kustantaja,
                Kuvaus: Kuvaus,
                Luokittelu: Luokittelu,
                image: file.path,
                sarjaid: sarjaid,
            });

            try {
                await createdSarja.save();
            }
            catch (err) {
                const error = new HttpError("Virhe", 500);
                return next(error);
            }
        }
    });
};

exports.getSarjaImage = async (req, res, next) => {
    const sarjaid = req.params._id;
    let sarja;
    try {
        sarja = await Sarjas.findById(sarjaid);
    } catch (err) {
        const error = new HttpError("Could not find sarja", 500);
        return next(error);
    }
    if (!sarja || !sarja.image) {
        const error = new HttpError("Could not find sarja", 404);
        return next(error);
    }

    // Retrieve the image using GridFS
    try {
        const client = await MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db();
        const gfs = Grid(db, mongoose.mongo);

        const imageId = sarja.image;
        const readStream = gfs.createReadStream({ _id: imageId });

        readStream.on('error', (err) => {
            console.log('Error reading image:', err);
            res.status(404).send('Image not found');
        });

        res.set('Content-Type', 'image/jpeg');
        readStream.pipe(res);
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
        res.status(500).send('Internal server error');
    }
};

const getSarjabyId = async (req, res, next) => {
    const sarjaid = req.params._id;
    let sarja;
    try {
        sarja = await Sarjas.findById(sarjaid);
    } catch (err) {
        const error = new HttpError("Could not find sarja", 500);
        return next(error);
    }
    if (!sarja) {
        const error = new HttpError("Could not find sarja", 404);
        return next(error);
    }
    res.json(sarja);
};

const getAllSarjas = async (req, res, next) => {
    let Sarja;
    try {
        Sarja = await Sarjas.find();
    } catch (err) {
        const error = new HttpError("Err", 418);
        return next(error);
    }
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
exports.getSarjabyId = getSarjabyId;