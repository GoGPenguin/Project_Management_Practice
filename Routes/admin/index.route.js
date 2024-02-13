const dashboardRouters = require("./dashboard.route");
const productsRouters = require('./products.route')
const categoriesRouters = require('./categories.route')
const rolesRouters = require('./roles.route')
const accountsRouters = require('./accounts.route')
const myAccountRouters = require('./my-account.route')
const authRouters = require('./auth.route')
const settingsRouters = require('./settings.route')
const system = require('../../config/system')

const authMiddleware = require('../../middleware/admin/authen.middleware')


module.exports = (app) => {


    app.use(
        system.prefixAdmin + '/dashboard',
        authMiddleware.requireAuth,
        dashboardRouters
    )

    app.use(
        `${system.prefixAdmin}/products`,
        authMiddleware.requireAuth,
        productsRouters
    )

    app.use(
        `${system.prefixAdmin}/categories`,
        authMiddleware.requireAuth,
        categoriesRouters
    )

    app.use(
        `${system.prefixAdmin}/roles`,
        authMiddleware.requireAuth,
        rolesRouters
    )

    app.use(
        `${system.prefixAdmin}/my-account`,
        authMiddleware.requireAuth,
        myAccountRouters
    )

    app.use(
        `${system.prefixAdmin}/accounts`,
        authMiddleware.requireAuth,
        accountsRouters
    )

    app.use(
        `${system.prefixAdmin}/settings`,
        authMiddleware.requireAuth,
        settingsRouters
    )

    app.use(`${system.prefixAdmin}/auth`, authRouters)

}