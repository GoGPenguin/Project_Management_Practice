const express = require('express')
const router = express.Router();

const controller = require("../../Controllers/admin/dashboard.controller")

router.get('/', controller.dashboard)
module.exports = router;