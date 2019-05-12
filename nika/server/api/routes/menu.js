const express = require('express');
const router = express.Router();
const controller = require('../controllers/menu');


router.get('/', controller.getMenu);
router.get('/text', controller.getMenuText);


module.exports = router;
