const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../configs/config');


module.exports = {
    login: async (req,res) => {
        const candidate = await User.findOne({email: req.body.email});
        if (candidate) {
            const password = candidate.password === req.body.password;
            if (password) {
                const token = jwt.sign({
                    email: candidate.email
                }, {expiresIn: config.jwtLife * 60 * 1000});
                res.status(201).json({
                    token: 'Bearer ' + token,
                    logined: true
                })
            } else {
                res.status(400).json({
                    message: 'Wrong Password ...'
                })
            }
        } else {
            res.status(404).json({
                message: 'User not found ...'
            })
        }
    },
    register: async (req,res) => {
        const candidate = await User.findOne({email: req.body.email});
        if (candidate) {
            res.status(409).json({
                message: 'This email is already registered ...'
            })
        }
    }
};