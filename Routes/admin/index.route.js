const dashboardRouters = require("./dashboard.route");
const system = require('../../config/system')

module.exports = (app) => {

    app.use(system.prefixAdmin + '/dashboard', dashboardRouters)
}