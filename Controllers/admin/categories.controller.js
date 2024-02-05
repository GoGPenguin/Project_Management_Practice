const Category = require('../../models/category.model')
const systemConfig = require('../../config/system')

// [GET] /admin/categories
module.exports.categories = async (req, res) => {
    let find = {
        deleted: false,
    }

    const categories = await Category.find(find)


    res.render('admin/pages/categories/index', {
        titlePage: "Categories",
        categories: categories
    })
}

// [GET] /admin/categories/create
module.exports.create = async (req, res) => {

    res.render('admin/pages/categories/create', {
        titlePage: "Create categories",
    })
}

// [POST] /admin/categories/create
module.exports.createCategory = async (req, res) => {
    if (req.body.position == "") {
        const countCategories = await Category.countDocuments();
        req.body.position = parseInt(countCategories) + 1
    } else {
        req.body.position = parseInt(req.body.position)
    }   

    const category = new Category(req.body)

    await category.save()

    res.redirect(`${systemConfig.prefixAdmin}/categories`)
}