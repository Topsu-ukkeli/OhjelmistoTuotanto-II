const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const KirjaSchema = new Schema({
    //Createdate: {type: Date, default: Date.now, required: true}, // Kirjalle tiedot
    _id: {type:ObjectId, default:ObjectId},
    title: {type: String, required: false},
    author: {type: String, required: false},
    published: {type: String, required: false},
    image: {type:String,required:true},
    page: {type:String,required:false},
    sarjaid: {type:String,required:false},
},{versionKey: false })

module.exports = mongoose.model('Kirjas', KirjaSchema);