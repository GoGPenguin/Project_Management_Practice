const Chat = require('../../models/chat.model')
const User = require('../../models/user.model')
const {
    uploadToCloudinary
} = require('../../helper/uploadCloundinary.js')



// [GET] /chat
module.exports.index = async (req, res) => {
    const userId = res.locals.user.id
    const fullName = res.locals.user.fullName

    _io.once('connection', (socket) => {
        socket.on('Client_send_message', async (data) => {
            let images = []

            for (const imageBuffer of data.images) {
                const links = await uploadToCloudinary(imageBuffer)
                images.push(links)
            }

            const chat = new Chat({
                user_id: userId,
                content: data.content,
                images: images
            })
            await chat.save()

            _io.emit('Server_return_message', {
                userId: userId,
                fullName: fullName,
                content: data.content,
                images: images
            })
        })

        socket.on('Client_send_typing', (type) => {
            socket.broadcast.emit('Server_return_typing', {
                userId: userId,
                fullName: fullName,
                type: type
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