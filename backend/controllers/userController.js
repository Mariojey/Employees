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