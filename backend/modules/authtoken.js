require('dotenv').config()

const jwt = require('jsonwebtoken');

function generateToken(user, id) {
    return jwt.sign({ id, user }, 'shhhhh');
}

function decodeToken(token) {
    console.log(jwt.decode(token, 'shhhhh'));
    return jwt.decode(token, 'shhhhh');
}

function verifyToken(token, user) {
    try {
        const decodedToken = decodeToken(token)

        return decodedToken;
    } catch {
        return false;
    }
}

module.exports = {
    generateToken: generateToken,
    decodeToken: decodeToken,
    verifyToken: verifyToken
}