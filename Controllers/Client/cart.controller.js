const Cart = require('../../models/cart.model')
const Product = require('../../models/product.model')
const priceCalculator = require('../../helper/product')

// [POST] /cart/add/:id
module.exports.add = async (req, res) => {
    const cartId = req.cookies.cartId
    const product_id = req.params.id

    const cart = await Cart.findOne({
        _id: cartId
    })

    const existProduct = cart.products.find(
        (item) => item.product_id == req.params.id
    )

    if (!existProduct) {
        const objectCart = {
            product_id: req.params.id,
            quantity: parseInt(req.body.quantity)
        }

        await Cart.updateOne({
            _id: cartId
        }, {
            $push: {
                products: objectCart
            }
        })
    } else {
        const newQuantity = parseInt(req.body.quantity) + existProduct.quantity

        await Cart.updateOne({
            _id: cartId,
            'products.product_id': product_id,
        }, {
            'products.$.quantity': newQuantity
        })
    }




    req.flash('success', 'Thêm sản phẩm vào giỏ thành công')

    res.redirect('back')
}

// [GET] /cart
module.exports.cart = async (req, res) => {
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

    res.render('Client/Pages/cart/index', {
        titlePage: "Giỏ hàng",
        cartDetail: cart
    })
}