const Product = require('../../models/product.model')
const Category = require('../../models/category.model')
const Account = require('../../models/account.model')
const systemConfig = require('../../config/system')

const filterStatusHelper = require('../../helper/filterStatus')
const searchHelper = require('../../helper/search')
const paginationHelper = require('../../helper/pagination')
const selectTreeHelper = require('../../helper/createTree')


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

    let sort = {}

    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue
    } else sort.position = "desc"

    const data = await Product
        .find(find)
        .sort(sort)
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skip);

    for (const it of data) {
        const user = await Account.findOne({
            _id: it.createdBy.account_id
        })

        if (user) {
            it.accountFullName = user.fullName
        }
    }

    res.render('admin/pages/products/index', {
        titlePage: "PRODUCTS",
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

    await Product.updateOne({
        _id: id
    }, {
        status: status
    })

    req.flash('success', 'Cập nhật trạng thái thành công')

    res.redirect('back');
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type
    const ids = req.body.ids.split(", ")

    if (type == "delete-all") {
        await Product.updateMany({
            _id: {
                $in: ids
            }
        }, {
            deleted: true,
            deletedBy: {
                account_id: res.locals.user.id,
                deletedAt: new Date()
            }
        })
        req.flash('success', `Xóa thành công ${ids.length} sản phẩm`)
    } else if (type == "change-position") {
        for (const item of ids) {
            let [id, position] = item.split('-')
            await Product.updateOne({
                _id: id
            }, {
                position: parseInt(position)
            })
        }
        req.flash('success', `Cập nhật trạng thái thành công của ${ids.length} sản phẩm`)
    } else {
        await Product.updateMany({
            _id: {
                $in: ids
            }
        }, {
            status: type
        })
        req.flash('success', `Cập nhật trạng thái thành công của ${ids.length} sản phẩm`)
    }

    res.redirect('back');
}

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id

    // await Product.deleteOne({ _id: id })
    await Product.updateOne({
        _id: id
    }, {
        deleted: true,
        deletedBy: {
            account_id: res.locals.user.id,
            deletedAt: new Date()
        }
    })
    req.flash('success', `Cập nhật trạng thái thành công sản phẩm`)

    res.redirect('back');
}

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
    const categories = await Category.find({
        deleted: false
    })

    const newCategories = selectTreeHelper.tree(categories)
    res.render("admin/pages/products/create", {
        titlePage: "Thêm mới sản phẩm",
        categories: newCategories,
    })
}



// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)

    if (req.body.position == "") {
        const countProducts = await Product.countDocuments()
        req.body.position = parseInt(countProducts) + 1
    } else {
        req.body.position = parseInt(req.body.position)
    }

    req.body.createdBy = {
        account_id: res.locals.user.id,
    }

    const product = new Product(req.body)
    product.save()

    res.redirect(`${systemConfig.prefixAdmin}/products`)
}

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }
        const item = await Product.findOne(find)

        const categories = await Category.find({
            deleted: false
        })

        const newCategories = selectTreeHelper.tree(categories)

        if (item == null) {
            req.flash('error', 'Không tồn tại sản phẩm')
            res.redirect(`${systemConfig.prefixAdmin}/products`)
        }
        res.render("admin/pages/products/edit", {
            titlePage: "Chỉnh sửa sản phẩm",
            item: item,
            categories: newCategories
        })
    } catch (error) {
        req.flash('error', 'Không tồn tại sản phẩm')
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }

}

// [PATCH] /admin/products/create
module.exports.editPost = async (req, res) => {
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    req.body.position = parseInt(req.body.position)

    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`
    }

    try {
        await Product.updateOne({
            _id: req.params.id
        }, req.body)
        req.flash('success', 'Cập nhật thành công')
    } catch (err) {
        req.flash('error', 'Cập nhật không thành công')
    }

    res.redirect(`${systemConfig.prefixAdmin}/products`)
}

// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }

        const product = await Product.findOne(find)


        res.render("admin/pages/products/detail", {
            titlePage: product.title,
            product: product
        })
    } catch (err) {
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
}