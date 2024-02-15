const User = require('../../models/user.model')

module.exports.usersSocket = async (res) => {
    _io.once('connection', (socket) => {
        socket.on('Client_add_friend', async (userId) => {
            const myId = res.locals.user.id
            
            const existUserRequest = await User.findOne({
                _id: userId,
                acceptFriend: myId
            })

            if(!existUserRequest) {
                await User.updateOne({
                    _id: userId
                }, {
                    $push: { acceptFriend: myId }
                })
            }

            const existUserRespond = await User.findOne({
                _id: myId,
                request: userId
            })

            if(!existUserRespond) {
                await User.updateOne({
                    _id: myId
                }, {
                    $push: { request: userId }
                })
            }
        })
    })
}