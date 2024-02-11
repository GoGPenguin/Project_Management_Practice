const Cart = require('../../models/cart.model')

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