const User = require("../models/User")

const logger = require('../logger')
const tokenHandler = require('../modules/authtoken');

// -------USERS-----------//

exports.getAllUsers = (req, res) => {
    User.find((err, users) => {
        logger.info(`Program has received list of all users from database`)
        res.json(users)
    });
};

exports.getUserById = (req, res) => {
    let id = req.params.id
    User.findById(id, (err, user) => {
        if (!user) {
            logger.info(`Program has not found user in database`)
            res.status(404).send('User not found')
        } else {
            logger.info(`Program has received user data from database`)
            res.json(user)
        }
    })
}

exports.createUser = async(req, res, next) => {
    try {
        let user = new User(req.body)
        await user.save()
            .then((user) => {
                logger.info(`Program has created element in database`)
                const token = tokenHandler.generateToken(user.email, user._id, user.permission)
                res.status(200).send({ status: 'OK', user: user, token: token })
            })
    } catch (error) {
        logger.info(`Program has got this error ${error}`)
        console.log(error);
        next(error)
    }
}

exports.checkUser = (req, res) => {

    let email = req.body.email;
    let password = req.body.password;
    User.find({ email: { $regex: email }, password: { $regex: password } }, (err, user) => {
        if (user.length == 0) {
            logger.info(`Program has not found user in database`)
            res.status(404).json({ message: 'User not found' });
        } else {
            logger.info(`Program has checked user`)
            const token = tokenHandler.generateToken(user[0].email, user[0]._id, user[0].permission);

            res.json({ status: 'OK', user: user, token: token })
        }
    })

}

exports.updateUser = (req, res) => {
    let data = req.body;
    let id = req.params.id;
    User.findByIdAndUpdate(id, data).then((data) => {
        logger.info(`Program has updated user`)
        res.status(200).json(data)
    }).catch(() => {
        logger.info(`Program has got failed when user has been creating`)
        res.status(404).send('Fail')
    })
}