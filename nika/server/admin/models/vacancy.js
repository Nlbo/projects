const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VacancySchema = new Schema({
    image: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: new Date()
    },
    updated: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('Vacancy', VacancySchema);
