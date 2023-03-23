const HttpError = require("../models/http-error");
const Users = require("../models/Users");
const mongoose = require("mongoose");

const createdUser = async (req, res, next) => {
    const { Name, Username, Password, Email } = req.body;
    if (!Name || !Username || !Password || !Email) {
        const error = new HttpError("TÄYTÄ", 413);
        return next(error);
    }
    else {
        if (await Users.findOne({ $or: [{ Username }, { Email }] })) {
            const error = new HttpError("Löytyy jo", 422);
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
                try {
                    await createdUser.save();
                }
                catch (err) {
                    console.log("Miksi",000);
                }

            } catch (err) {
                const error = new HttpError("Could not create user", 500);
                return next(error);
            }
            res.status(201).json(createdUser);
        }
    }
};
const getAllUsers = async (req, res, next) => {
    let User;
    try {
        User = await Users.find();
    } catch (err) {
        const error = new HttpError("Err", 418);
        return next(error);
    }
    if (!User || User.length == 0) {
        const error = new HttpError("Not found", 404);
        return next(error);
    }
    res.json(User);
};
const DeleteUser = async (req, res, next) => {
    const usersID = req.params._id;
    let users;
    try {
        users = await Users.findById(usersID);
    } catch (err) {
        const error = new HttpError('Could not delete kirja', 500);
        return next(error);
    }
    if (!users) {
        const error = new HttpError('Could not find that kirja', 404);
        return next(error);
    }
    try {
        await Users.deleteOne({ _id: usersID })
    } catch (err) {
        const error = new HttpError('Could not delete kirja', 500);
        return next(error);
    }

    res.status(200).json({ message: 'Deleted sarja' });
}

const updateUserById = async (req, res, next) => {
    const { Name, Username, Password, Email } = req.body;
    const userID = req.params._id;

    try {
        const user = await Users.findById(userID);

        if (user) {
            const existingUser = await Users.findOne({
                $and: [{ _id: { $ne: userID } }, { $or: [{ Username }, { Email }] }],
            });
            if (existingUser) {
                const error = new HttpError(
                    "Käyttäjänimi tai sähköposti on jo käytössä",
                    422
                );
                return next(error);
            }

            user.Name = Name;
            user.Username = Username;
            user.Password = Password;
            user.Email = Email;

            await user.save();
            console.log(user, "Käyttäjä päivitetty");

            res.json({ Users: user.toObject({ getters: true }) });
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
exports.createdUser = createdUser;
exports.getAllUsers = getAllUsers;
exports.updateUserById = updateUserById;
exports.DeleteUser = DeleteUser;