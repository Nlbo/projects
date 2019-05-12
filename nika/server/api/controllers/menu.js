const Menu = require('../../admin/models/menu');
const Settings = require('../../admin/models/settings');
const errors = require('../_helper/error_handler');


module.exports = {
    getMenu: async (req, res) => {
        try {
            let candidates = await Menu.find({});
            res.status(201).json(candidates)
        } catch (e) {
            errors.notFound(res, errors)
        }
    },
    getMenuText: async (req, res) => {
        try {
            let text = await Settings.findOne({key: 'menu text'});
            res.status(200).json(text.value)
        } catch (e) {
            console.log(55);
            errors.notFound(res, errors)
        }
    }
};
