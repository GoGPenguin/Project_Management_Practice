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
        .sort({ position: "desc" })
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

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => { 
    const status = req.params.status
    const id = req.params.id

    await Product.updateOne({ _id: id }, { status: status })

    res.redirect('back');
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => { 
    const type = req.body.type
    const ids = req.body.ids.split(", ")

    if (type == "delete-all") {
        await Product.updateMany({ _id: { $in: ids } }, { deleted: true, deletedAt: new Date() })
    }
    else if (type == "change-position") {
        for (const item of ids) {
            let [id, position] = item.split('-')
            await Product.updateOne({ _id: id }, { position: parseInt(position) })
        }
    }
    else await Product.updateMany({ _id: { $in: ids } }, {status: type})

    res.redirect('back');
}

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => { 
    const id = req.params.id

    // await Product.deleteOne({ _id: id })
    await Product.updateOne({ _id: id }, { 
        deleted: true, 
        deletedAt: new Date()
    })

    res.redirect('back');
}