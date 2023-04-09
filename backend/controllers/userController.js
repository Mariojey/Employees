const User = require("../models/User")

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
        if (!user) {
            res.status(404).send('User not found');
        } else {
            res.json(user)
        }
    })

}