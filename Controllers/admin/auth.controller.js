const {
    prefixAdmin
} = require('../../config/system')
const Account = require('../../models/account.model')
const md5 = require('md5')

module.exports.login = (req, res) => {
    if (req.cookies.token) {
        res.redirect(`${prefixAdmin}/dashboard`)
    } else {
        res.render('admin/pages/auth/login', {
            titlePage: "LOGIN",
        })
    }
}

// [POST] /admin/auth/login
module.exports.loginAccount = async (req, res) => {
    const {
        email,
        password
    } = req.body

    const user = await Account.findOne({
        email: email,
        deleted: false
    })

    if (!user) {
        req.flash('error', 'Không tồn tại')
        res.redirect('back')
    } else if (md5(password) != user.password) {
        req.flash('error', 'Sai mật khẩu')
        res.redirect('back')
    } else if (user.status != 'active') {
        req.flash('error', 'Tài khoản bị khóa')
        res.redirect('back')
        return;
    }

    res.cookie('token', user.token)
    res.redirect(`${prefixAdmin}/dashboard`)

}

module.exports.logout = (req, res) => {
    res.clearCookie('token')
    res.redirect(`${prefixAdmin}/auth/login`)
    res.end()
}