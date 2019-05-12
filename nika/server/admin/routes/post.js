const express = require('express');
const router = express.Router();
const controller = require('../controllers/posts');
const jwtCompare = require('../middleware/jwtCompare');
const uploadImg = require('../middleware/multer');


router.use('/', jwtCompare);
router.get('/', controller.getPosts);
router.post('/',uploadImg.single('image') ,controller.addPost);
router.post('/ckeditor',uploadImg.single('image'), controller.ckEditorAddImage);
router.put('/',uploadImg.single('image'), controller.changePost);
router.delete('/', controller.deletePost);

module.exports = router;
