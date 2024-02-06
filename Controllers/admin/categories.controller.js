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

// [GET] /admin/categories/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }

        const categories = await Category.find({
            deleted: false
        })

        const data = await Category.findOne(find)

        const records = createTree.tree(categories)

        res.render('admin/pages/categories/edit', {
            titlePage: "Edit categories",
            categories: records,
            data: data
        })
    } catch (err) {
        req.redirect(`${systemConfig.prefixAdmin}/categories`)
    }
}

// [PATCH] /admin/categories/edit/:id
module.exports.editCategory = async (req, res) => {
    const id = req.params.id


    req.body.position = parseInt(req.body.position)

    await Category.updateOne({
        _id: id
    }, req.body)

    res.redirect('back')
}