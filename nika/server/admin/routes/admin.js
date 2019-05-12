const express = require('express');
const router = express.Router();


const auth = require('./auth'),
    posts = require('./post'),
    sliders = require('./slider'),
    portfolio = require('./portfolio'),
    settings = require('./settings'),
    menu = require('./menu'),
    vacancy = require('./vacancy'),
    block = require('./block'),
    medias = require('./media'),
    group = require('./group');

router.use('/post', posts);
router.use('/vacancy', vacancy);
router.use('/block', block);
router.use('/slider', sliders);
router.use('/media', medias);
router.use('/auth', auth);
router.use('/settings', settings);
router.use('/group', group);
router.use('/menu', menu);
router.use('/portfolio', portfolio);

module.exports = router;
