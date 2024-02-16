const express = require('express')
const router = express.Router();
const { isAccess } = require('../../middleware/client/chat.middleware')

const controller = require("../../Controllers/Client/chat.controller")

router.get('/:id', isAccess, controller.index)

module.exports = router;