const Category = require('../../models/category.model')
const systemConfig = require('../../config/system')
const createTree = require('../../helper/createTree')

module.exports.category = async (req, res, next) => {
    const categories = await Category.find({
        deleted: false,
    })

    const newCategories = createTree.tree(categories)

    res.locals.layoutCategory = newCategories

    next()
}