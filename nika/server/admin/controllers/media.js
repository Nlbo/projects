const Media = require('../models/media');
const errors = require('../_help/error_handler');
const fs = require('fs');
const sharp = require('sharp');
module.exports = {
    getMedias: async (req,res) => {
        try {
            let medias = await Media.find({});
            res.status(201).json(medias)
        } catch (e) {
            errors.notFound(res, errors);
        }
    },
    addMedia: async (req,res) => {
        let media = {
            type: req.body.type,
            alt: req.body.alt,
            image: req.file.filename
        };
        // sharp(req.file.path)
        //     .resize({
        //         width: 400,
        //         height: 400
        //     })
        //     .sharpen()
        //     .toBuffer()
        //     .then(data => fs.writeFileSync(req.file.path, data))
        //     .catch(e => console.log(e));
        try {
            await new Media(media).save();
            res.status(201).json({
                msg: 'Media added successfully ...'
            })
        } catch (e) {
            errors.invalidData(res, errors);
        }
    },
    changeMedia: async (req,res) => {
        let candidate = req.query.id + '';
        let oldMedia = await Media.findOne({_id: req.query.id});
        let media = {
            type: req.body.type,
            alt: req.body.alt,
            image: req.file ? req.file.filename : req.body.image
        };
        if (req.file) {
            fs.unlinkSync(`./admin/_uploads/medias/${oldMedia.image}`);
        }
        media.updated = new Date();
        try {
            await Media.findByIdAndUpdate(
                {_id: candidate},
                {$set: media},
                {new: true});
            res.status(201).json(media)
        } catch (e) {
            errors.invalidData(res, errors);
        }
    },
    deleteMedia: async (req,res) => {
        let media = req.query.id + '';
        let candidate = await Media.findOne({_id: media});
        if (candidate) {
            try {
                await Media.remove({_id: media});
                fs.unlinkSync(`./admin/_uploads/medias/${candidate.image}`);
                res.status(201).json({
                    msg: 'Media has removed successfully'
                })
            } catch (e) {
                errors.invalidData(res, errors);
            }
        } else {
            errors.notFound(res, errors)
        }
    }
};
