const User = require('../../models/user.model')
const md5 = require('md5')

module.exports.register = async (req, res) => {
    res.render('Client/Pages/user/register', {
        titlePage: 'Đăng ký tài khoản',

    })
}

// [POST] /user/register
module.exports.registerUser = async (req, res) => {
    const email = req.body.email

    const existUser = await User.findOne({
        email: email,
        deleted: false
    })

    if (existUser) {
        req.flash('error', "Đã tồn tại tài khoản")
        res.redirect('back')
        return;
    }

    req.body.password = md5(req.body.password)

    const user = new User(req.body)
    await user.save()

    res.cookie('tokenUser', user.tokenUser)

    res.redirect('/')
}

// [GET] /user/login
module.exports.login = async (req, res) => {
    res.render('Client/Pages/user/login', {
        titlePage: 'Đăng nhập',

    })
}

// [POST] /user/login
module.exports.loginUser = async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
    })

    if (user) {
        if (user.password == md5(req.body.password)) {
            if (user.status != 'active') {
                req.flash('error', "Tài khoản bị khóa hoặc đang chờ xác nhận")
                res.redirect('back')
            } else {
                res.cookie('tokenUser', user.tokenUser)
                res.redirect('/')
            }
        } else {
            req.flash('error', "Sai mật khẩu")
            res.redirect('back')
        }
    } else {
        req.flash('error', "Không tồn tại email")
        res.redirect('back')
    }
}

// [GET] /user/logout
module.exports.logout = async (req, res) => {
    res.clearCookie('tokenUser')

    res.redirect('/')
}