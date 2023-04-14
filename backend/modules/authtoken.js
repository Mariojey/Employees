require('dotenv').config()

const jwt = require('jsonwebtoken');

function generateToken(user, id, role) {
    return jwt.sign({ id, user, role }, 'shhhhh');
}

function decodeToken(token) {
    return jwt.decode(token, 'shhhhh');
}

function verifyToken(token, user, role) {
    try {
        const decodedToken = decodeToken(token)

        return decodedToken.user === user;
    } catch {
        return false;
    }
}

module.exports = {
    generateToken: generateToken,
    decodeToken: decodeToken,
    verifyToken: verifyToken
}