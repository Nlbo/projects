const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SubCategoryLanguagesSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    removed: {
        type: Boolean,
        default: false
    },
    language:
        {
            name:{
                type:String
            },
            value:{
                type:String
            }
        },
    order: {
        type: Number,
        default: 0
    }
},{ versionKey: false});
module.exports =  mongoose.model('subcategoryLanguages', SubCategoryLanguagesSchema);
