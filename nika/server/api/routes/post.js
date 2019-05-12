const express = require('express');
const router = express.Router();
const controller = require('../controllers/posts');


router.get('/', controller.getPosts);
router.get('/:id', controller.getPost);

module.exports = router;
