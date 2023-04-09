const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.route('/').get(
    userController.getAllUsers
).post(
    userController.createUser
)

router.route('/login').post(
    userController.checkUser
)

module.exports = router