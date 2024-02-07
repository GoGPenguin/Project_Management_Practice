const Role = require('../../models/role.model')
const systemConfig = require('../../config/system')

module.exports.role = async (req, res) => {
    let find = {
        deleted: false
    }

    const records = await Role.find(find)

    res.render(`admin/pages/roles/index`, {
        titlePage: 'Phân quyền',
        records: records
    })
}

// [GET] /admin/roles/create
module.exports.create = async (req, res) => {

    res.render(`admin/pages/roles/create`, {
        titlePage: 'Tạo nhóm quyền',
    })
}

// [POST] /admin/roles/create
module.exports.createRole = async (req, res) => {
    const record = new Role(req.body)
    await record.save()

    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
    try {
        let find = {
            deleted: false,
            _id: req.params.id
        }

        const role = await Role.findOne(find)

        res.render(`admin/pages/roles/edit`, {
            titlePage: 'Chỉnh sửa nhóm quyền',
            item: role
        })
    } catch (err) {
        res.redirect(`${systemConfig.prefixAdmin}/roles`)
    }

}

// [PATCH] /admin/roles/edit/:id
module.exports.editRole = async (req, res) => {

    try {
        const id = req.params.id


        await Role.updateOne({
            _id: id
        }, req.body)

        req.flash('success', "Cập nhật thành công")

    } catch (err) {
        req.flash('error', "Cập nhật thất bại")
    }


    res.redirect(`back`)
}

// [GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
    let find = {
        deleted: false
    }

    const records = await Role.find(find)

    res.render(`admin/pages/roles/permissions`, {
        titlePage: 'Chỉnh sửa phân quyền',
        records: records
    })
}

// [PATCH] /admin/roles/permissions
module.exports.permissionsChange = async (req, res) => {

    const data = JSON.parse(req.body.permissions)

    console.log(data)

    for (const item of data) {
        await Role.updateOne({
            _id: item.id
        }, {
            permissions: item.permissions
        })
    }

    req.flash('success', 'Cập nhật thành công')

    res.redirect(`back`)
}