const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ImagesSchema = new Schema({
    postDate: {
        type: String,
        default: new Date().toLocaleDateString()
    },
    showDate:{
        type: String,
        default: ''
    },
    path:{
        type: String,
    },
    filename:{
        type: String,
    },
    thumbnailPath:{
        type: String,
    },
    removed:{
        type: Boolean,
        default: false
    },
    removedDate:{
        type: String,
        default: ''
    },
    subCategory:{
        type: String,
        default: 'unSubCategory'
    },
    category: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        default: 0
    }
},{ versionKey: false});
module.exports =  mongoose.model('images', ImagesSchema);