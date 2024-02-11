const Product = require('../../models/product.model')
const priceCalculator = require('../../helper/product')

module.exports.index = async (req, res) => {
    const keyword = req.query.keyword
    let newProducts = []

    if (keyword) {
        const keywordRegex = new RegExp(keyword, "i")
        const products = await Product.find({
            title: keywordRegex,
            status: 'active',
            deleted: false
        })

        newProducts = priceCalculator.priceNew(products)
    }


    res.render('Client/Pages/search/index', {
        titlePage: "Kết quả tìm kiếm",
        keyword: keyword,
        products: newProducts
    })
}