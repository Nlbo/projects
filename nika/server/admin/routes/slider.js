const express = require('express');
const router = express.Router();
const controller = require('../controllers/slider');
const jwtCompare = require('../middleware/jwtCompare');
const uploadImg = require('../middleware/multer');


router.use('/', jwtCompare);
router.get('/', controller.getSliders);
router.get('/media', controller.getMedia);
router.post('/', controller.addSlider);
router.put('/' , controller.changeSlider);
router.delete('/', controller.deleteSlider);

module.exports = router;
