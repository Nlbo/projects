const express = require('express');
const router = express.Router();
// const controller = require('../controllers/images');
const passport = require('passport');

router.get('/gettree', (req,res) => {
    res.status(200).end()
});
router.post('/getimages', (req,res) => {
    res.status(200).end()
});
router.post('/getremovedlist', (req,res) => {
    res.status(200).end()
});

module.exports = router;