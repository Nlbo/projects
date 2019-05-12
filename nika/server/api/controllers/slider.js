const Slider = require('../../admin/models/slider');
const Settings = require('../../admin/models/settings');
const errors = require('../_helper/error_handler');

module.exports = {
    getSliders: async (req, res) => {
        let sliders = await Slider.find().populate('img');
        if (sliders) {
            res.status(201).json(sliders);
        } else {
            errors.notFound(res, errors)
        }
    },
    getSliderSpeed: async (req, res) => {
        let speed = await Settings.find({key: 'slider speed'});
        if (speed) {
            res.status(201).json(speed[0]);
        } else {
            errors.notFound(res, errors)
        }
    }
};
