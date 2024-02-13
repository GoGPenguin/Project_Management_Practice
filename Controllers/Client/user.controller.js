const User = require('../../models/user.model')
const Cart = require('../../models/cart.model')
const ForgotPassword = require('../../models/forgot-password.model')
const md5 = require('md5')
const {
    generateRandomNumber,
} = require('../../helper/generate')

const {
    sendMail
} = require('../../helper/sendMail')

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
        deleted: false
    })

    if (user) {
        if (user.password == md5(req.body.password)) {
            if (user.status != 'active') {
                req.flash('error', "Tài khoản bị khóa hoặc đang chờ xác nhận")
                res.redirect('back')
            } else {
                res.cookie('tokenUser', user.tokenUser)
                await Cart.updateOne({
                    _id: req.cookies.cartId
                }, {
                    user_id: user.id
                })
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

// [GET] /user/password/forgot
module.exports.forgot = async (req, res) => {
    res.render('Client/Pages/user/forgot', {
        titlePage: 'Lấy lại mật khẩu',
    })
}

// [POST] /user/password/forgot
module.exports.forgotPassword = async (req, res) => {
    const email = req.body.email
    const user = await User.findOne({
        email: email,
        deleted: false
    })

    if (!user) {
        req.flash('error', "Email không tồn tại")
        res.redirect('back')
        return;
    }

    const otp = generateRandomNumber(6)

    const objectForgotPassword = {
        email: email,
        otp: otp,
        expireAt: Date.now()
    }

    const forgotPassword = new ForgotPassword(objectForgotPassword)
    await forgotPassword.save()

    const subject = 'RESET PASSWORD'
    const context = `
       Mã OTP xác minh lấy lại mật khẩu là <b>${otp}</b>. Lưu ý không được để lộ mã OTP này
       Thời hạn sử dụng mã là 3 phút.
    `

    sendMail(email, subject, context)

    res.redirect(`/user/password/otp/?email=${email}`)
}


// [GET] /user/password/otp
module.exports.otpPassword = async (req, res) => {
    const email = req.query.email

    res.render('Client/Pages/user/otp-password', {
        titlePage: 'Nhập mã OTP',
        email: email,
    })
}

// [POST] /user/password/otp
module.exports.otpPasswordSend = async (req, res) => {
    const email = req.body.email
    const otp = req.body.otp

    const result = await ForgotPassword.findOne({
        email: email,
        otp: otp
    })

    if (!result) {
        req.flash('error', 'OTP không hợp lệ')
        res.redirect('back')
        return
    }

    const user = await User.findOne({
        email: email
    })

    res.cookie('tokenUser', user.tokenUser)

    res.redirect('/user/password/reset')
}

// [GET] /user/password/reset
module.exports.resetPassword = async (req, res) => {
    res.render('Client/Pages/user/reset-password', {
        titlePage: 'Đổi mật khẩu',
    })
}

// [POST] /user/password/reset
module.exports.resetPasswordUser = async (req, res) => {
    const password = req.body.password

    const tokenUser = req.cookies.tokenUser

    await User.updateOne({
        tokenUser: tokenUser
    }, {
        password: md5(password)
    })

    res.redirect('/')
}

// [GET] /user/password/info
module.exports.info = async (req, res) => {
    res.render('Client/Pages/user/info', {
        titlePage: 'Thông tin cá nhân',
    })
}