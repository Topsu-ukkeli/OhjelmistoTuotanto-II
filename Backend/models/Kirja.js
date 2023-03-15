const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const KirjaSchema = new Schema({
    //Createdate: {type: Date, default: Date.now, required: true}, // Kirjalle tiedot
    Julkaisuvuosi: {type: String, required: true},
    Kirjanimi: {type: String, required: true},
    Kuvaus: {type: String, required: true},
    _id: {type:ObjectId, default:ObjectId}
},{versionKey: false })

module.exports = mongoose.model('Kirja', KirjaSchema);