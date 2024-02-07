const express = require('express')
const router = express.Router();
const multer = require('multer')
const upload = multer()

const middlewareUpload = require('../../middleware/admin/uploadCloud.middleware')

const controller = require("../../Controllers/admin/accounts.controller")


router.get('/', controller.accounts)

router.get('/create', controller.create)

router.post(
    '/create', 
    upload.single('avatar'),
    middlewareUpload.upload,
    controller.createAccount)

module.exports = router;