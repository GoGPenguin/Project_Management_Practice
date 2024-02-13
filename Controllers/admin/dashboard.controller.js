const User = require('../../models/user.model')
const Account = require('../../models/account.model')
const Product = require('../../models/product.model')
const Category = require('../../models/category.model')

module.exports.dashboard = async (req, res) => {
    const statistic = {
        category: {
            total: await Category.countDocuments(),
            active: await Category.countDocuments({
                status: 'active'
            }),
            inactive: await Category.countDocuments({
                status: 'inactive'
            })
        },
        product: {
            total: await Product.countDocuments(),
            active: await Product.countDocuments({
                status: 'active'
            }),
            inactive: await Product.countDocuments({
                status: 'inactive'
            })
        },
        account: {
            total: await Account.countDocuments(),
            active: await Account.countDocuments({
                status: 'active'
            }),
            inactive: await Account.countDocuments({
                status: 'inactive'
            })
        },
        user: {
            total: await User.countDocuments(),
            active: await User.countDocuments({
                status: 'active'
            }),
            inactive: await User.countDocuments({
                status: 'inactive'
            })
        },
    }

    res.render('admin/pages/dashboard/index', {
        pageTitle: "DASHBOARD",
        statistic: statistic
    })
}