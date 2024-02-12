const express = require('express')
const router = express.Router();
const validateUser = require('../../validate/client/user.validate')


const controller = require("../../Controllers/Client/user.controller")

router.get('/register', controller.register)

router.post(
    '/register', 
    validateUser.validateRegister,
    controller.registerUser)

module.exports = router;