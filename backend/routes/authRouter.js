const express = require('express');

const authController = require('../controllers/authController')

const router = express.Router();

router.route('/verifytoken').post(
    authController.verifyToken
)

module.exports = router