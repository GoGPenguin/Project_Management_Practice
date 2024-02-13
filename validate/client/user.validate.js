const validateRegister = (req, res, next) => {
    if (!req.body.fullName) {
        req.flash('error', 'Vui lòng nhập đầy đủ tên')
        res.redirect('back')
        return;
    }

    validateLogin(req, res, next)
}

const validateLogin = (req, res, next) => {
    if (!req.body.password) {
        req.flash('error', 'Vui lòng nhập mật khẩu')
        res.redirect('back')
        return;
    }

    validateForgot(req, res, next)
}

const validateForgot = (req, res, next) => {
    if (!req.body.email) {
        req.flash('error', 'Vui lòng nhập email')
        res.redirect('back')
        return;
    }
    next()
}

const validateConfirmPassword = (req, res, next) => {
    if (!req.body.password) {
        req.flash('error', 'Nhập mật khẩu')
        res.redirect('back')
        return
    }

    if (!req.body.confirmPassword) {
        req.flash('error', 'Nhập mật khẩu xác nhận')
        res.redirect('back')
        return
    }

    if (req.body.confirmPassword != req.body.password) {
        req.flash('error', 'Mật khẩu mới phải trùng với mật khẩu xác nhận')
        res.redirect('back')
        return
    }

    next()
}

module.exports = {
    validateRegister,
    validateLogin,
    validateForgot,
    validateConfirmPassword
}