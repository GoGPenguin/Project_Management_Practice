const Cart = require('../../models/cart.model')
const Product = require('../../models/product.model')
const Order = require('../../models/order.model')
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

// [POST] /checkout/order
module.exports.order = async (req, res) => {
    const cartId = req.cookies.cartId
    const userInfo = req.body

    const cart = await Cart.findOne({
        _id: cartId
    })

    let products = []

    for (const item of cart.products) {
        const objectProduct = {
            product_id: item.product_id,
            price: 0,
            discountPercentage: 0,
            quantity: item.quantity
        }

        const productInfo = await Product.findOne({
            _id: item.product_id
        })

        objectProduct.price = productInfo.price
        objectProduct.discountPercentage = productInfo.discountPercentage

        products.push(objectProduct)
    }

    const objectOrder = {
        cart_id: cartId,
        userInfo: userInfo,
        products: products
    }

    const order = new Order(objectOrder)
    await order.save()

    await Cart.updateOne({
        _id: cartId
    }, {
        products: []
    })

    res.redirect(`/checkout/success/${order.id}`)
}

// [GET] /checkout/success/:id
module.exports.success = async (req, res) => {
    const order = await Order.findOne({
        _id: req.params.id
    })

    for (const product of order.products) {
        const productInfo = await Product.findOne({
            _id: product.product_id
        }).select('title thumbnail')

        product.productInfo = productInfo

        product.priceNew = priceCalculator.priceNewProduct(product).priceNew

        product.totalPrice = product.priceNew * product.quantity
    }


    order.totalPrice = order.products.reduce((sum, item) => sum + item.totalPrice, 0)

    res.render('Client/Pages/checkout/success', {
        titlePage: 'Đặt hàng thành công',
        orderDetail: order
    })
}