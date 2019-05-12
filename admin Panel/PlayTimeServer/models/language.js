const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Languages = new Schema({
    language: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
},{ versionKey: false});
module.exports =  mongoose.model('languages', Languages);
