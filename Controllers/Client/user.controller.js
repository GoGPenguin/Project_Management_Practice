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