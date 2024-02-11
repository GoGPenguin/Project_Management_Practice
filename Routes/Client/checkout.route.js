const express = require('express')
const router = express.Router();

const controller = require("../../Controllers/Client/checkout.controller")

router.get('/', controller.index)

router.post('/order', controller.order)

module.exports = router;