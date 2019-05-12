const Media = require('../../admin/models/media');
const errors = require('../_helper/error_handler');

module.exports = {
    getMedias: async (req,res) => {
        try {
            let medias = await Media.find({});
            res.status(201).json(medias)
        } catch (e) {
            errors.notFound(res, errors);
        }
    }
};
