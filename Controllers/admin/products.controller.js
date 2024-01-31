const Product = require('../../models/product.model')

const filterStatusHelper = require('../../helper/filterStatus')
const searchHelper = require('../../helper/search')
const paginationHelper = require('../../helper/pagination')

// [GET] /admin/products
module.exports.products = async (req, res) => {


    let find = {
        deleted: false
    }

    const filterStatus = filterStatusHelper(req.query)
    if (req.query.status)
        find.status = req.query.status

    const object = searchHelper(req.query)
    if (object.regex) {
        find.title = object.regex
    }

    const countProducts = await Product.countDocuments(find)
    
    const objectPagination = paginationHelper(req.query, countProducts)


    const data = await Product
        .find(find)
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skip);

    res.render('admin/pages/products/index', {
        pageTitle: "PRODUCTS",
        data: data,
        filterStatus: filterStatus,
        searchKey: object.keyword,
        pagination: objectPagination,
    })
}

// [GET] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => { 
    const status = req.params.status
    const id = req.params.id

    await Product.updateOne({ _id: id }, { status: status })

    res.redirect('back');
}