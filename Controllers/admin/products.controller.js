const Product = require('../../models/product.model')

const filterStatusHelper = require('../../helper/filterStatus')
const searchHelper = require('../../helper/search')

module.exports.products = async (req, res) => {

    const filterStatus = filterStatusHelper(req.query)

    let find = {
        deleted: false
    }

    if (req.query.status)
        find.status = req.query.status

    const object = searchHelper(req.query)

    if (object.regex) {
        find.title = object.regex
    }

    const data = await Product.find(find);

    res.render('admin/pages/products/index', {
        pageTitle: "PRODUCTS",
        data: data,
        filterStatus: filterStatus,
        searchKey: object.keyword,
    })
}

