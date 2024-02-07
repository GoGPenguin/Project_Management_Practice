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

router.get('/edit/:id', controller.edit)

router.patch(
    '/edit/:id', 
    upload.single('avatar'),
    middlewareUpload.upload,
    controller.editAccount)

module.exports = router;