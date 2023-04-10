const User = require("../models/User")

const tokenHandler = require('../modules/authtoken');

// -------USERS-----------//

exports.getAllUsers = (req, res) => {
    User.find((err, users) => {
        res.json(users)
    });
};

exports.getUserById = (req, res) => {
    let id = req.params.id
    User.findById(id, (err, user) => {
        if (!user) {
            res.status(404).send('User not found')
        } else {
            res.json(user)
        }
    })
}

exports.createUser = async(req, res, next) => {
    try {
        let user = new User(req.body)
        await user.save()
            .then((user) => {
                const token = tokenHandler.generateToken(user.email, user._id, user.permission)
                res.status(200).send({ status: 'OK', user: user, token: token })
            })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

exports.checkUser = (req, res) => {

    let email = req.body.email;
    let password = req.body.password;
    User.find({ email: { $regex: email }, password: { $regex: password } }, (err, user) => {
        if (user.length == 0) {
            res.status(404).json({ message: 'User not found' });
        } else {

            const token = tokenHandler.generateToken(user.email, user._id, user.permission);

            res.json({ status: 'OK', user: user, token: token })
        }
    })

}

exports.updateUser = (req, res) => {
    let data = req.body;
    let id = req.params.id;
    User.findByIdAndUpdate(id, data).then((data) => {
        res.status(200).json(data)
    }).catch(() => {
        res.status(404).send('Fail')
    })
}