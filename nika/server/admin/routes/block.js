const express = require('express');
const router = express.Router();
const controller = require('../controllers/block');
const jwtCompare = require('../middleware/jwtCompare');
const uploadImg = require('../middleware/multer');


router.use('/', jwtCompare);
router.get('/', controller.getBlock);
router.post('/',uploadImg.array('image'),controller.addBlock);
router.put('/', uploadImg.array('image'),controller.changeBlock);
router.delete('/', controller.deleteBlock);

module.exports = router;
