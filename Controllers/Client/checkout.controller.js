const Cart = require('../../models/cart.model')
const Product = require('../../models/product.model')
const priceCalculator = require('../../helper/product')

module.exports.index = async (req, res) => {
    const cartId = req.cookies.cartId

    const cart = await Cart.findOne({
        _id: cartId
    })

    if (cart.products.length > 0) {
        for (const item of cart.products) {
            const productId = item.product_id

            const productInfo = await Product.findOne({
                _id: productId
            })



            item.productInfo = priceCalculator.priceNewProduct(productInfo)

            item.totalPrice = item.quantity * productInfo.priceNew
        }
    }

    cart.totalPrice = cart.products.reduce((sum, item) => sum + item.totalPrice, 0)


    res.render('Client/Pages/checkout/index', {
        titlePage: 'Đặt hàng',
        cartDetail: cart
    })
}