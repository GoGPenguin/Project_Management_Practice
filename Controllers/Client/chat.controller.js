const Chat = require('../../models/chat.model')
const User = require('../../models/user.model')


// [GET] /chat
module.exports.index = async (req, res) => {
    const userId = res.locals.user.id
    const fullName = res.locals.user.fullName

    _io.once('connection', (socket) => {
        socket.on('Client_send_message', async (content) => {
            const chat = new Chat({
                user_id: userId,
                content: content
            })
            await chat.save()

            _io.emit('Server_return_message', {
                userId: userId,
                fullName: fullName,
                content: content
            })
        })
    })

    const chats = await Chat.find({
        deleted: false
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