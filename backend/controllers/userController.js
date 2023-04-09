const User = require("../models/User")

const tokenHandler = require('../modules/authtoken');

// -------USERS-----------//

exports.getAllUsers = (req, res) => {
    User.find((err, users) => {
        res.json(users)
    });
};

exports.createUser = async(req, res, next) => {
    try {
        let user = new User(req.body)
        await user.save()
            .then((user) => {
                res.status(200).send(user)
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
            res.status(404).send('User not found');
        } else {

            const token = tokenHandler.generateToken(user.email, user._id, user.permission);

            res.json({ status: 'OK', user: user, token: token })
        }
    })

}