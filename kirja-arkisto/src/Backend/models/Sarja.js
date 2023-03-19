const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const SarjaSchema = new Schema({
    //Createdate: {type: Date, default: Date.now, required: true}, // sarjalle tiedot
    Sarjanimi: {type: String, required: true},
    Kustantaja: {type: String, required: true},
    Kuvaus: {type: String, required: true},
    Luokittelu: {type: String, required: true},
    _id: {type:ObjectId, default:ObjectId}
},{versionKey: false })

module.exports = mongoose.model('Sarja', SarjaSchema);