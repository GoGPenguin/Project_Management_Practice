const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()

const middlewareUpload = require('../../middleware/admin/uploadCloud.middleware')

const controller = require('../../Controllers/admin/categories.controller.js')

const {
    createCategory
} = require('../../validate/admin/category.validate')

router.get('/', controller.categories)

router.get('/create', controller.create)

router.post(
    '/create', 
    upload.single('thumbnail'),
    middlewareUpload.upload,
    createCategory,
    controller.createCategory)

router.get(
    '/edit/:id',
    controller.edit
)

router.patch(
    '/edit/:id',
    upload.single('thumbnail'),
    middlewareUpload.upload,
    createCategory, 
    controller.editCategory
)

module.exports = router;