const express = require('express');
const router = express.Router();
const controller = require('../controllers/settings');
const jwtCompare = require('../middleware/jwtCompare');
const uploadImg = require('../middleware/multer');


router.use('/', jwtCompare);
router.get('/', controller.getSettings);
router.post('/', controller.addSettings);
router.put('/', controller.changeSettings);
router.delete('/', controller.deleteSettings);

module.exports = router;
