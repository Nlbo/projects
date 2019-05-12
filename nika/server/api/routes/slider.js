const express = require('express');
const router = express.Router();
const controller = require('../controllers/slider');


router.get('/', controller.getSliders);
router.get('/speed', controller.getSliderSpeed);

module.exports = router;
