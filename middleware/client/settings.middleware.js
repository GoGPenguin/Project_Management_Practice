const Settings = require('../../models/settings-general.model')

module.exports.settings = async (req, res, next) => {
    const settings = await Settings.findOne({})

    res.locals.settingsGeneral = settings

    next()
}