const User = require('../models/user');
const errors = require('../_help/error_handler');
const jwt = require('jsonwebtoken');
const config = require('../config/configs');
const jwtCompare = require('../middleware/jwtCompare');

module.exports = {
    login: async (req,res) => {
        let candidate = await User.findOne({username: req.body.username});
        if (candidate) {
            let pass = candidate.password.localeCompare(req.body.password);
            if (!pass) {
                let user = {
                    username: candidate.username,
                    email: candidate.email,
                    role: candidate.role
                };
                let data = jwt.sign(user , config.jwt_key);
                res.status(201).json({
                    token: data,
                    user: user
                })
            } else {
                errors.invalidData(res, errors);
            }
        } else {
            errors.notFound(res, errors);
        }
    },
    reg: async (req,res) => {
        if (req.headers.token ? jwtCompare(req.headers.token) : null) {
            let data = {
                email: req.body.newuser.email,
                password: req.body.newuser.password,
                username: req.body.newuser.username,
                role: req.body.newuser.username ? req.body.newuser.username : 'stuff',
            };
            try {
                await new User(data).save();
                res.status(201).json({
                    msg: 'User added successfully'
                })
            } catch (e) {
                errors.userSaveError(res, errors);
            }
        } else {
            errors.haventRole(res, errors);
        }
    }
};
