const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const OmakirjastoSchema = new Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Kirjanimi: {type: String, required: true},
    Email: {type: String, required: true},
    _id: {type:ObjectId, default:ObjectId}
},{versionKey: false })

module.exports = mongoose.model('Omakirjasto', OmakirjastoSchema);