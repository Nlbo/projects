const Vacancy = require('../models/vacancy');
const errors = require('../_help/error_handler');
const fs = require('fs');
const sharp = require('sharp');
module.exports = {
    getVacancy: async (req,res) => {
        try {
            let vacancy = await Vacancy.find({});
            res.status(201).json(vacancy)
        } catch (e) {
            errors.notFound(res, errors);
        }
    },
    addVacancy: async (req,res) => {
        let vacancy = {
            description: req.body.description,
            title: req.body.title,
            content: req.body.content,
            alt: req.body.alt,
            image: req.file.filename
        };
        console.log(vacancy)
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
            await new Vacancy(vacancy).save();
            res.status(201).json({
                msg: 'Vacancy added successfully ...'
            })
        } catch (e) {
            errors.invalidData(res, errors);
        }
    },
    changeVacancy: async (req,res) => {
        let candidate = req.query.id + '';
        let oldVacancy = await Vacancy.findOne({_id: req.query.id});
        let vacancy = {
            description: req.body.description,
            content: req.body.content,
            title: req.body.type,
            alt: req.body.alt,
            image: req.file ? req.file.filename : req.body.image
        };
        vacancy.updated = new Date();
        if (req.file) {
            fs.unlinkSync(`./admin/_uploads/vacancy/${oldVacancy.image}`);
        }
        vacancy.updated = new Date();
        try {
            await Vacancy.findByIdAndUpdate(
                {_id: candidate},
                {$set: vacancy},
                {new: true});
            res.status(201).json(vacancy)
        } catch (e) {
            errors.invalidData(res, errors);
        }
    },
    deleteVacancy: async (req,res) => {
        let vacancy = req.query.id + '';
        let candidate = await Vacancy.findOne({_id: vacancy});
        if (candidate) {
            try {
                await Vacancy.remove({_id: vacancy});
                fs.unlinkSync(`./admin/_uploads/vacancy/${candidate.image}`);
                res.status(201).json({
                    msg: 'Vacancy has removed successfully'
                })
            } catch (e) {
                errors.invalidData(res, errors);
            }
        } else {
            errors.notFound(res, errors)
        }
    }
};
