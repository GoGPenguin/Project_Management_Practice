const Account = require('../../models/account.model')
const md5 = require('md5')

module.exports.myAccount = async (req, res) => {
    res.render(`admin/pages/my-account/index`, {
        titlePage: 'Trang cá nhân',
    })
}

// [GET] admin/my-account/edit
module.exports.edit = async (req, res) => {
    res.render(`admin/pages/my-account/edit`, {
        titlePage: 'Trang cá nhân',
    })
}

// [PATCH] admin/my-account/edit
module.exports.editAccount = async (req, res) => {
    const emailExist = await Account.findOne({
        _id: {
            $ne: res.locals.user.id
        },
        email: req.body.email,
        deleted: false
    })

    if (emailExist) {
        req.flash('error', 'Đã tồn tại email')
    } else {
        if (req.body.password)
            req.body.password = md5(req.body.password)
        else delete req.body.password

        await Account.updateOne({
            _id: res.locals.user.id
        }, req.body)

        req.flash('success', "Thành công")
    }


    res.redirect('back')
}