const dashboardRouters = require("./dashboard.route");
const productsRouters = require('./products.route')
const categoriesRouters = require('./categories.route')
const rolesRouters = require('./roles.route')
const system = require('../../config/system')

module.exports = (app) => {

    app.use(system.prefixAdmin + '/dashboard', dashboardRouters)

    app.use(`${system.prefixAdmin}/products`, productsRouters)
    
    app.use(`${system.prefixAdmin}/categories`, categoriesRouters)

    app.use(`${system.prefixAdmin}/roles`, rolesRouters)

}
