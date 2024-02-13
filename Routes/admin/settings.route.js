const express = require('express')
const router = express.Router();const multer = require('multer')
const upload = multer()

const middlewareUpload = require('../../middleware/admin/uploadCloud.middleware')


const controller = require("../../Controllers/admin/settings.controller")

router.patch(
    '/general', 
    upload.single('logo'),
    middlewareUpload.upload,
    controller.edit)

router.get('/general', controller.index)


module.exports = router;