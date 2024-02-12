const categoryMiddleware = require('../../middleware/client/category.middleware')
const cartMiddleware = require('../../middleware/client/cart.middleware')
const userMiddleware = require('../../middleware/client/user.middleware')

const productRouters = require("./product.route");
const homeRouters = require('./home.route')
const searchRouters = require('./search.route')
const cartRouters = require('./cart.route')
const checkoutRouters = require('./checkout.route')
const userRouters = require('./user.route')

module.exports = (app) => {
    app.use(categoryMiddleware.category)

    app.use(cartMiddleware.cartId)

    app.use(userMiddleware.infoUser)

    app.use('/', homeRouters)

    app.use("/products", productRouters)

    app.use("/search", searchRouters)

    app.use("/cart", cartRouters)

    app.use("/checkout", checkoutRouters)

    app.use("/user", userRouters)

}