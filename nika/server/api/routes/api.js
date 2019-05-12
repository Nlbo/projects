const express = require('express');
const router = express.Router();


const posts = require('./post'),
    sliders = require('./slider'),
    medias = require('./media');
    contact = require('./contact');
    portfolio = require('./portfolio');
    menu = require('./menu');
    settings = require('./settings');

router.use('/post', posts);
router.use('/slider', sliders);
router.use('/media', medias);
router.use('/contact', contact);
router.use('/portfolio', portfolio);
router.use('/menu', menu);
router.use('/settings', settings);

module.exports = router;
