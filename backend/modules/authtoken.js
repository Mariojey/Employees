require('dotenv').config()

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function generateToken(user, id, role) {
    return jwt.sign({ id, user, role }, JWT_SECRET);
}

function decodeToken(token) {
    return jwt.decode(token, JWT_SECRET);
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