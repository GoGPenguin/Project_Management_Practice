const Account = require('../../models/account.model')
const Role = require('../../models/role.model')
const md5 = require('md5')
const systemConfig = require('../../config/system')

module.exports.accounts = async (req, res) => {
    let find = {
        deleted: false
    }

    const records = await Account.find(find)

    for (const record of records) {
        const role = await Role.findOne({
            deleted: false,
            _id: record.role_id
        })

        record.role = role.title
    }

    res.render(`admin/pages/accounts/index`, {
        titlePage: 'Accounts',
        records: records
    })
}

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
    const roles = await Role.find({
        deleted: false
    }).select("-password-token")


    res.render(`admin/pages/accounts/create`, {
        titlePage: 'Accounts',
        roles: roles
    })
}

// [POST] /admin/accounts/create
module.exports.createAccount = async (req, res) => {
    const emailExist = await Account.findOne({
        email: req.body.email,
        deleted: false
    })

    if (!emailExist) {
        req.body.password = md5(req.body.password)
        const record = new Account(req.body)

        await record.save()
        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    } else {
        req.flash('error', 'Đã tồn tại email')
        res.redirect('back')
    }


    
}