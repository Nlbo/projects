const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');


router.post('/login', controller.login);
router.post('/reg', controller.reg);


module.exports = router;
