const Portfolio = require('../models/portfolio');
const errors = require('../_help/error_handler');
const fs = require('fs');
const sharp = require('sharp');


module.exports = {
    getPortfolio: async (req,res) => {
        try {
            let portfolio = await Portfolio.find({});
            res.status(201).json(portfolio)
        } catch (e) {
            errors.notFound(res, errors);
        }
    },
    addPortfolio: async (req,res) => {
        let candidate = await Portfolio.findOne({title: req.body.title});
        if (!candidate) {
            let portfolio = {
                title: req.body.title,
                description: req.body.description,
                link: req.body.link,
                imgs: []
            };
            req.files.forEach(item => {
                portfolio.imgs.push(item.filename)
            });
            try {
                await new Portfolio(portfolio).save();
                res.status(201).json({
                    msg: 'Portfolio added successfully ...'
                })
            } catch (e) {
                errors.invalidData(res, errors);
            }
        } else {
                req.files.forEach(item => {
                    fs.unlinkSync(`./admin/_uploads/portfolio/${item.filename}`);
                });
            errors.conflictError(res, errors)
        }
    },
    changePortfolio: async (req,res) => {
        let candidate = req.query.id + '';
        let portfolio = {
            title: req.body.title,
            description: req.body.description,
            link: req.body.link,
            imgs: req.body.imgs
        };
        if (req.files) {
            req.files.forEach(item => {
                if (portfolio.imgs.length > 0) {
                    portfolio.imgs += ',' + item.filename;
                } else {
                    portfolio.imgs += item.filename;
                }
            });
        }
        portfolio.imgs = portfolio.imgs.split(',');
        if (req.body.deletedimages) {
            let deletedimages = req.body.deletedimages.split(',');
            if (deletedimages.length > 0) {
                deletedimages.forEach(item => {
                    fs.unlinkSync(`./admin/_uploads/portfolio/${item}`);
                });
            }
        }
        try {
            await Portfolio.findByIdAndUpdate(
                {_id: candidate},
                {$set: portfolio},
                {new: true});
            res.status(201).json(portfolio)
        } catch (e) {
            errors.invalidData(res, errors);
        }
    },
    deletePortfolio: async (req,res) => {
        let portfolio = req.query.id + '';
        let candidate = await Portfolio.findOne({_id: portfolio});
        try {
            await Portfolio.remove({_id: portfolio});
            candidate.imgs.forEach(item => {
                fs.unlinkSync(`./admin/_uploads/portfolio/${item}`);
            });
            res.status(201).json({
                msg: 'Portfolio has removed successfully'
            })
        } catch (e) {
            errors.invalidData(res, errors);
        }
    }
};
