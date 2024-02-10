const express = require('express')
const router = express.Router();
const multer = require('multer')
const upload = multer()

const middlewareUpload = require('../../middleware/admin/uploadCloud.middleware')

const controller = require("../../Controllers/admin/my-account.controller")

router.get('/', controller.myAccount)

router.get('/edit', controller.edit)

router.patch(
    '/edit', 
    upload.single('avatar'),
    middlewareUpload.upload,
    controller.editAccount
    )


module.exports = router;