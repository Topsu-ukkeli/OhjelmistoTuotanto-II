const HttpError = require("../models/http-error");
const Users = require("../models/Users");
const mongoose = require("mongoose");

const createdUser = async (req, res, next) => {
    const { Name, Username, Password, Email } = req.body;
    if (!Name || !Username || !Password || !Email) {
        const error = new HttpError("TÄYTÄ")
        return next(error);
    }
    else {
        const newid = new mongoose.Types.ObjectId().toHexString();
        const createdUser = new Users({
            _id: newid,
            Name: Name,
            Username: Username,
            Password: Password,
            Email: Email,
        });
        try {
            console.log("ja mehän saadaa", createdUser);
            await createdUser.save();
        } catch (err) {
            const error = new HttpError("Could not create user", 500);
            return next(error);
        }
        res.status(201).json(createdUser);
    }
};
const getAllUsers = async (req, res, next) => {
    let User;
    try {
        console.log("Ei anna");
        User = await Users.find();
    } catch (err) {
        const error = new HttpError("Err", 418);
        return next(error);
    }
    console.log(User);
    if (!User || User.length == 0) {
        const error = new HttpError("Not found", 404);
        return next(error);
    }
    res.json(User);
};
exports.createdUser = createdUser;
exports.getAllUsers = getAllUsers;