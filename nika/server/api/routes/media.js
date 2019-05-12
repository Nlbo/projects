const express = require('express');
const router = express.Router();
const controller = require('../controllers/media');


router.get('/', controller.getMedias);

module.exports = router;
