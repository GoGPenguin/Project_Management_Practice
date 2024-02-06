const express = require('express')
const router = express.Router();

const controller = require("../../Controllers/admin/roles.controller")

router.get('/', controller.role)

router.get('/create', controller.create)

router.post('/create', controller.createRole)

router.get('/edit/:id', controller.edit)

router.patch('/edit/:id', controller.editRole)

module.exports = router;