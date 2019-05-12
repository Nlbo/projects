const express = require('express');
const router = express.Router();
const controller = require('../controllers/settings');


router.get('/:key', controller.getSettings);


module.exports = router;
