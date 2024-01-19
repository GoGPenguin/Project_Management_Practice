const Product = require('../../models/product.model')

module.exports.index = async (req, res) => {
    const data = await Product.find({ 
        status: "active",
    });

    const newProducts = data.map(item => {
        item.price = (item.price * (100 - item.discountPercentage) / 100).toFixed(2)
        return item
        }
    )    

    data.forEach(item => {
        item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(2)
    })

    console.log(newProducts)

    res.render('Client/Pages/Products/index', {
        titlePage: "Danh sách sản phẩm",
        data: data,
    })
}