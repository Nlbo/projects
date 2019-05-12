const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SliderSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    img: {
        type: Schema.Types.ObjectId,
        ref: 'Media',
        required: true
    }
});

module.exports = mongoose.model('Slider', SliderSchema);
