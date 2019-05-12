const Settings = require('../../admin/models/settings');
const errors = require('../_helper/error_handler');

module.exports = {
    getSettings: async (req,res) => {
        try {
            let data = await Settings.findOne({key: req.params.key}, 'value');
            if(!data){
                res.status(200).json(null)
            }
            res.status(201).json(data.value)
        }catch (e) {
            errors.notFound(res, errors);
        }
    }
};
