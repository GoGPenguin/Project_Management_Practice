const Chat = require('../../models/chat.model')
const User = require('../../models/user.model')
const {
    chat
} = require('../../sockets/client/chat.socket')

// [GET] /chat
module.exports.index = async (req, res) => {
    const roomId = req.params.id
    chat(req, res)
    const chats = await Chat.find({
        deleted: false,
        room_chat_id: roomId
    })


    for (const chat of chats) {
        const infoUser = await User.findOne({
            _id: chat.user_id
        }).select('fullName id')

        chat.infoUser = infoUser
    }

    res.render('Client/Pages/chat/index', {
        titlePage: "Chat",
        chats: chats
    })
}