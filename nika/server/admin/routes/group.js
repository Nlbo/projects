const express = require('express');
const router = express.Router();
const controller = require('../controllers/group');
const jwtCompare = require('../middleware/jwtCompare');
const uploadImg = require('../middleware/multer');


router.use('/', jwtCompare);
router.get('/', controller.getGroup);
router.post('/', controller.addGroup);
router.put('/',controller.changeGroup);
router.delete('/', controller.deleteGroup);

module.exports = router;
