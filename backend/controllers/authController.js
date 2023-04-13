const tokenHandler = require('../modules/authtoken')

exports.verifyToken = (req, res, next) => {
    const data = req.body;
    console.log(data);
    if (tokenHandler.verifyToken(data.token, data.user, data.role)) {
        res.status(200).send({ status: 'OK', message: `Token valid for user ${data.user}`, role: data.role })

    } else {
        res.status(400).send({ status: 'NOT FOUND', message: 'Token invalid' })
    }
}