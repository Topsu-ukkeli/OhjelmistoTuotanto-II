const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new Schema({
    Name: {type: String, required: true},
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    _id: {type:ObjectId, default:ObjectId}
},{versionKey: false })

module.exports = mongoose.model('Users', UserSchema);