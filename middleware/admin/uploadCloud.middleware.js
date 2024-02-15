const {uploadToCloudinary} = require('../../helper/uploadCloundinary.js')

module.exports.upload = async (req, res, next) => {
    if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer);
        req.body[req.file.fieldname] = result
    }
    next()
}

