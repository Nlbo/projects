const express = require('express');
const router = express.Router();
const controller = require('../controllers/media');
const jwtCompare = require('../middleware/jwtCompare');
const uploadImg = require('../middleware/multer');


router.use('/', jwtCompare);
router.get('/', controller.getMedias);
router.post('/',uploadImg.single('image') ,controller.addMedia);
router.put('/',uploadImg.single('image'), controller.changeMedia);
router.delete('/', controller.deleteMedia);

module.exports = router;
