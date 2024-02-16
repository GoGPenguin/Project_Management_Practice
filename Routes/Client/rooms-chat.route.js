const express = require('express')
const router = express.Router();

const controller = require("../../Controllers/Client/rooms-chat.controller")

router.get('/', controller.index)

router.get('/create', controller.create)

router.post('/create', controller.createRoom)

module.exports = router;