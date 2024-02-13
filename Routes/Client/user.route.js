const express = require('express')
const router = express.Router();
const {
    validateRegister,
    validateLogin,
    validateForgot,
    validateConfirmPassword
} = require('../../validate/client/user.validate')

const {
    requireAuth
} = require('../../middleware/client/auth.middleware')

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

router.get('/password/forgot', controller.forgot)

router.get('/password/otp', controller.otpPassword)

router.post('/password/otp', controller.otpPasswordSend)

router.post('/password/forgot', validateForgot, controller.forgotPassword)

router.get('/password/reset', controller.resetPassword)

router.post('/password/reset', validateConfirmPassword, controller.resetPasswordUser)

router.get('/info', requireAuth, controller.info)



module.exports = router;