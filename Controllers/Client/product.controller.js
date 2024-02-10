const Product = require('../../models/product.model')

module.exports.index = async (req, res) => {
    const data = await Product.find({ 
        status: "active",
        deleted: false
    })
    .sort({ position: "desc" });

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

    res.render('Client/Pages/Products/detail.pug', {
        titlePage: "Chi tiết sản phẩm",
        product: product,
    })
}