const jwt = require('jsonwebtoken');
const config = require('../config/configs');

module.exports = (req, res, next) => {
    try {
        token = req.headers.token;
        let user = jwt.verify(token, config.jwt_key);
        if (user.role === 'supperAdmin') {
            next();
        } else {
            return res.status(403).json({
                message: 'No accesses  !!!'
            });
        }
    } catch (e) {
        return  res.status(403).json({
            msg: 'Have not permission ...'
        })
    }
};
