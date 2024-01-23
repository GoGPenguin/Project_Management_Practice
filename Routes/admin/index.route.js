const dashboardRouters = require("./dashboard.route");
const productsRouters = require('./products.route')
const system = require('../../config/system')

module.exports = (app) => {

    app.use(system.prefixAdmin + '/dashboard', dashboardRouters)

    app.use(`${system.prefixAdmin}/products`, productsRouters)
}
