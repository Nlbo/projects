const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
    category: {
        type: String,
        required: true
    },
    removed: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        default: 0
    }
},{ versionKey: false});
module.exports =  mongoose.model('categories', CategorySchema);
