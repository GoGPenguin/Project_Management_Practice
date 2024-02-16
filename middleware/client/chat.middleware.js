const RoomChat = require('../../models/room-chat.model')

module.exports.isAccess = async (req, res, next) => {
    const userId = res.locals.user.id
    const roomId = req.params.id

    const roomInfo = await RoomChat.findOne({
        _id: roomId,
        'users.user_id': userId,
        deleted: false
    })

    if (roomInfo) {
        next()
    } else {
        res.redirect('/')
    }

}