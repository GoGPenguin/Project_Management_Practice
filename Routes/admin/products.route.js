const express = require('express')
const router = express.Router()

const controller = require('../../Controllers/admin/products.controller')

router.get('/', controller.products)

module.exports = router;