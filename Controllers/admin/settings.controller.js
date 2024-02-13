const Settings = require('../../models/settings-general.model')

module.exports.index = async (req, res) => {
    const settings = await Settings.findOne({})

    res.render(`admin/pages/settings/index`, {
        titlePage: 'Cài đặt chung',
        settings: settings
    })
}


module.exports.edit = async (req, res) => {
    const settings = await Settings.findOne({})


    if (!settings) {
        const record = new Settings(req.body)
        await record.save()
    } else {
        await Settings.updateOne({
            _id: settings.id
        }, req.body)
    }

    req.flash('success', 'Cập nhật thành công')
    res.redirect('back')
}