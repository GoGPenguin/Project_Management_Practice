const express = require('express')
const router = express.Router();

const controller = require("../../Controllers/admin/auth.controller")

const {
    validateLogin
} = require('../../validate/admin/login.validate')



router.get('/login', controller.login)

router.post(
    '/login', 
    validateLogin,
    controller.loginAccount)

router.get('/logout', controller.logout)



module.exports = router;