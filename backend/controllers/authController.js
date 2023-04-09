const tokenHandler = require('../modules/authtoken')

exports.verifyToken = async(req, res, next) => {
    const data = req.body;

    if (tokenHandler.verifyToken(data.token, data.user, data.role)) {
        res.status(200).json({ status: 'OK', message: `Token valid for user ${data.user}`, role: data.role })
        return;
    }

    res.status(400).json({ status: 'NOT FOUND', message: 'Token invalid' })
}