const mongoose = require('mongoose')
const generate = require('../helper/generate')


const accountSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    token: {
        type: String,
        default: generate.generateRandomString(20)
    },
    phone: String,
    avatar: String,
    role_id: String,
    status: {
        type: String,
        default: 'active'
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true
})

const account = mongoose.model('Account', accountSchema)

module.exports = account;