const tokenHandler = require('../modules/authtoken')

const logger = require('../logger')

exports.verifyToken = (req, res, next) => {
    const data = req.body;
    if (tokenHandler.verifyToken(data.token, data.user, data.role)) {
        logger.info(`Programm has valided token`)
        res.status(200).send({ status: 'OK', message: `Token valid for user ${data.user}`, role: data.role })
        return
    } else {
        logger.warn(`Programm has not valided token`)
        res.status(400).send({ status: 'NOT FOUND', message: 'Token invalid' })
    }
}