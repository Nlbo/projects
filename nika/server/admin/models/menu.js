const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    url: {
        type: String
    },
    typeId: {
        type: String
    },
    order: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Menu', MenuSchema);
