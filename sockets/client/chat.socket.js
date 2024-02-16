const Chat = require('../../models/chat.model')
const {
    uploadToCloudinary
} = require('../../helper/uploadCloundinary.js')



module.exports.chat = async (req, res) => {
    const userId = res.locals.user.id
    const fullName = res.locals.user.fullName
    const roomId = req.params.id

    _io.once('connection', (socket) => {
        socket.join(roomId)

        socket.on('Client_send_message', async (data) => {
            let images = []

            for (const imageBuffer of data.images) {
                const links = await uploadToCloudinary(imageBuffer)
                images.push(links)
            }

            const chat = new Chat({
                user_id: userId,
                room_chat_id: roomId,
                content: data.content,
                images: images
            })
            await chat.save()

            _io.to(roomId).emit('Server_return_message', {
                userId: userId,
                fullName: fullName,
                content: data.content,
                images: images
            })
        })

        socket.on('Client_send_typing', (type) => {
            socket.broadcast.to(roomId).emit('Server_return_typing', {
                userId: userId,
                fullName: fullName,
                type: type
            })
        })
    })
}