const Product = require('../../models/product.model')
const Category = require('../../models/category.model');
const priceCalculator = require('../../helper/product')
const categoryHelper = require('../../helper/productCategory')

module.exports.index = async (req, res) => {
    const data = await Product.find({
            status: "active",
            deleted: false
        })
        .sort({
            position: "desc"
        });

    data.forEach(item => {
        item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(2)
    })


    res.render('Client/Pages/Products/index', {
        titlePage: "Danh sách sản phẩm",
        data: data,
    })
}

// [GET] /products/:[slug]
module.exports.detail = async (req, res) => {
    const product = await Product.findOne({
        slug: req.params.slug,
        deleted: false
    })

    if (product.category_id) {
        const category = await Category.findOne({
            _id: product.category_id,
            status: 'active',
            deleted: false
        })
        product.category = category
    }


    res.render('Client/Pages/Products/detail.pug', {
        titlePage: "Chi tiết sản phẩm",
        product: priceCalculator.priceNewProduct(product),
    })
}

// [GET] /products/:[slugCategory]
module.exports.category = async (req, res) => {
    const category = await Category.findOne({
        slug: req.params.slugCategory,
        status: 'active',
        deleted: false
    })

    

    const listSub = await categoryHelper.getSubCategory(category.id)

    const listSubId = listSub.map(item => item.id)

    const product = await Product.find({
        category_id: {
            $in: [category.id, ...listSubId]
        },
        deleted: false
    }).sort({
        postion: 'desc'
    })

    console.log(product)


    res.render('Client/Pages/Products/index.pug', {
        titlePage: category.title,
        productsNew: priceCalculator.priceNew(product)
    })
}