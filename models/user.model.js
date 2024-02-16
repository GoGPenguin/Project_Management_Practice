const mongoose = require('mongoose')
const generate = require('../helper/generate')


const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    tokenUser: {
        type: String,
        default: generate.generateRandomString(30)
    },
    phone: String,
    avatar: String,
    friendList: [
        {
            user_id: String,
            room_chat_id: String
        }
    ],
    acceptFriend: Array,
    request: Array,
    statusOnline: String,
    status: {
        type: String,
        default: 'active'
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User;