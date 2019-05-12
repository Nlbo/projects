const express = require('express');
const router = express.Router();
const controller = require('../controllers/menu');
const jwtCompare = require('../middleware/jwtCompare');
const uploadImg = require('../middleware/multer');


router.use('/', jwtCompare);
router.get('/', controller.getMenu);
router.post('/', controller.addMenu);
router.put('/', controller.changeMenu);
router.put('/sort', controller.sortMenu);
router.delete('/', controller.deleteMenu);

module.exports = router;
