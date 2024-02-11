const express = require('express')
const router = express.Router();

const controller = require("../../Controllers/Client/search.controller")

router.get('/', controller.index)

module.exports = router;