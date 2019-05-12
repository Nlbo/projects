const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MediaSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Media', MediaSchema);
