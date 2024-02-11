const express = require('express')
const router = express.Router();

const controller = require("../../Controllers/Client/cart.controller")

router.post('/add/:id', controller.add)

router.get('/delete/:id', controller.delete)

router.get('/', controller.cart)

module.exports = router;