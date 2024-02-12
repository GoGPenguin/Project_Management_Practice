const express = require('express')
const router = express.Router();
const {validateRegister, validateLogin} = require('../../validate/client/user.validate')


const controller = require("../../Controllers/Client/user.controller")

router.get('/register', controller.register)

router.post(
    '/register', 
    validateRegister,
    controller.registerUser)

router.get('/login', controller.login)


router.post(
    '/login', 
    validateLogin,
    controller.loginUser)

router.get('/logout', controller.logout)

module.exports = router;