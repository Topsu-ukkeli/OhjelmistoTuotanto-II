const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const OmakirjastoSchema = new Schema({
    _id: {type:ObjectId, default:ObjectId},
    title: {type: String, required: true},
    author: {type: String, required: true},
    published: {type: String, required: true},
    image: {type:String,required:true},
    // sivut: {type:String,required:true},
    sarjaid: {type:String,required:true},
    user: {type:String},
},{versionKey: false })

module.exports = mongoose.model('Omakirjasto', OmakirjastoSchema);