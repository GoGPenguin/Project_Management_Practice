const express = require('express')
const router = express.Router()
const multer = require('multer')
const storageMulter = require('../../helper/storageMulter')
const upload = multer({
    storage: storageMulter()
})
const {createPost} = require('../../validate/admin/product.validate')
const controller = require('../../Controllers/admin/products.controller')

router.get('/', controller.products)

router.patch('/change-status/:status/:id', controller.changeStatus)

router.patch('/change-multi', controller.changeMulti)

router.delete('/delete/:id', controller.deleteItem)

router.get('/create', controller.create)

router.post(
    '/create', 
    upload.single('thumbnail'), 
    createPost,
    controller.createPost
    )

router.get('/edit/:id', controller.edit)

router.patch(
    '/edit/:id', 
    upload.single('thumbnail'), 
    createPost,
    controller.editPost)

router.get('/detail/:id', controller.detail)

module.exports = router;