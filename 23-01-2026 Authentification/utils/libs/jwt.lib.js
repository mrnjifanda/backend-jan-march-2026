const jwt = require('jsonwebtoken');
const KEY = process.env.SECRET_JWT_KEY;

const sign = (data) => {
    return jwt.sign(data, KEY);
};

const verify = (token) => {
    try {
        return jwt.verify(token, KEY);
    } catch (error) {
        return null;
    }
};

module.exports = { sign, verify };
