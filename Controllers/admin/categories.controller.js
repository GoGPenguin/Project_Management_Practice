const Category = require('../../models/category.model')
const systemConfig = require('../../config/system')
const createTree = require('../../helper/createTree')

// [GET] /admin/categories
module.exports.categories = async (req, res) => {
    let find = {
        deleted: false,
    }

    const categories = await Category.find(find)

    const newCategories = createTree.tree(categories)

    res.render('admin/pages/categories/index', {
        titlePage: "Categories",
        categories: newCategories
    })
}

// [GET] /admin/categories/create
module.exports.create = async (req, res) => {
    const find = {
        deleted: false,
    }

    const categories = await Category.find(find)

    const newCategories = createTree.tree(categories)


    res.render('admin/pages/categories/create', {
        titlePage: "Create categories",
        categories: newCategories
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