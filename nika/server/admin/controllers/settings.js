const Settings = require('../models/settings');
const errors = require('../_help/error_handler');

module.exports = {
    getSettings: async (req,res) => {
        try {
            let candidates = await Settings.find({});
            res.status(201).json(candidates)
        }catch (e) {
            errors.notFound(res, errors);
        }
    },
    addSettings: async (req,res) => {
        let candidate = await Settings.findOne({key: req.body.key});
        if (candidate) {
            errors.conflictError(res, errors)
        } else {
            let settings = {
                key: req.body.key,
                value: req.body.value
            };
            try {
              await new Settings(settings).save();
              res.status(201).json({
                  msg: "Settings has added successfully ..."
              })
            } catch (e) {
                errors.userSaveError(res, errors)
            }
        }
    },
    changeSettings: async (req,res) => {
        let candidate = await Settings.findOne({key: req.body.key});
        if (candidate) {
            let settings = {
                key: req.body.key,
                value: req.body.value
            };
            try {
                await Settings.findByIdAndUpdate(
                    {_id: candidate._id},
                    {$set: settings},
                    {new: true});
                res.status(201).json(settings)
            } catch (e) {
                errors.invalidData(res, errors);
            }
        } else {
            errors.notFound(res, errors)
        }
    },
    deleteSettings: async (req,res) => {
        let candidate = await Settings.findOne({key: req.query.key + ''});
        try {
            await Settings.remove({_id: candidate._id});
            res.status(201).json({
                msg: 'Settings has removed successfully'
            })
        } catch (e) {
            errors.invalidData(res, errors);
        }
    }
};
