const Slider = require('../models/slider');
const Media = require('../models/media');
const errors = require('../_help/error_handler');
const jwtCompare = require('../middleware/jwtCompare');
const fs = require('fs');
const sharp = require('sharp');

module.exports = {
    getSliders: async (req,res) => {
        let sliders = await Slider.find({}).populate('img');
        if (sliders) {
            res.status(201).json(sliders);
        } else {
            errors.notFound(res, errors)
        }
    },
    addSlider: async (req,res) => {
        console.log(req);
        let slider = {
          title: req.body.title,
          description: req.body.description,
          url: req.body.url,
          img: req.body.img
        };
        console.log(slider);
        try {
            await new Slider(slider).save();
            res.status(201).json({
                msg: 'Slider added successfully ...'
            })
        } catch (e) {
            errors.invalidData(res, errors);
        }
    },
    changeSlider: async (req,res) => {
       let candidate = req.query.id + '';
        let slider = {
            title: req.body.title,
            description: req.body.description,
            url: req.body.url,
            img: req.body.img
        };
        try {
            await Slider.findByIdAndUpdate(
                {_id: candidate},
                {$set: slider},
                {new: true});
            res.status(201).json(slider)
        } catch (e) {
            errors.invalidData(res, errors);
        }
    },
    deleteSlider: async (req,res) => {
        let slider = req.query.id + '';
        try {
            await Slider.remove({_id: slider});
            res.status(201).json({
                msg: 'Slider has removed successfully'
            })
        } catch (e) {
            errors.invalidData(res, errors);
        }
    },
    getMedia: async (req,res) => {
        let media = await Media.find({type: 'slider'});
        if (media) {
            res.status(201).json(media);
        } else {
            errors.notFound(res, errors)
        }
    }
};
