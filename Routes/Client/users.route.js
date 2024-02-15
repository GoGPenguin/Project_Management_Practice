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

const controller = require("../../Controllers/Client/users.controller")

router.get('/not-friend', controller.notFriend)

module.exports = router;