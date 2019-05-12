const express = require('express');
const router = express.Router();
const controller = require('../controllers/vacancy');
const jwtCompare = require('../middleware/jwtCompare');
const uploadImg = require('../middleware/multer');


router.use('/', jwtCompare);
router.get('/', controller.getVacancy);
router.post('/',uploadImg.single('image') ,controller.addVacancy);
router.put('/',uploadImg.single('image'), controller.changeVacancy);
router.delete('/', controller.deleteVacancy);

module.exports = router;
