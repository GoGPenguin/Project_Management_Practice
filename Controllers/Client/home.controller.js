const Product = require('../../models/product.model')
const priceCalculator = require('../../helper/product')

module.exports.index = async (req, res) => {

    const productsFeatured = await Product.find({
        featured: '1',
        deleted: false,
        status: 'active'
    })

    res.render('Client/Pages/Home/index', {
        titlePage: "Trang chủ",
        productsFeatured: priceCalculator.priceNew(productsFeatured)
    })
}