const User = require('../../models/user.model')
const RoomChat = require('../../models/room-chat.model')

module.exports.usersSocket = async (res) => {
    _io.once('connection', (socket) => {
        socket.on('Client_add_friend', async (userId) => {
            const myId = res.locals.user.id

            const existUserRequest = await User.findOne({
                _id: userId,
                acceptFriend: myId
            })

            if (!existUserRequest) {
                await User.updateOne({
                    _id: userId
                }, {
                    $push: {
                        acceptFriend: myId
                    }
                })
            }

            const existUserRespond = await User.findOne({
                _id: myId,
                request: userId
            })

            if (!existUserRespond) {
                await User.updateOne({
                    _id: myId
                }, {
                    $push: {
                        request: userId
                    }
                })
            }

            const infoUser = await User.findOne({
                _id: userId
            })

            const lengthFriendAccept = infoUser.acceptFriend.length

            socket.broadcast.emit('Server_return_length_accept_friend', {
                userId,
                lengthFriendAccept
            })
        })

        socket.on('Client_cancel_add', async (userId) => {
            const myId = res.locals.user.id

            const existUserRequest = await User.findOne({
                _id: userId,
                acceptFriend: myId
            })

            if (existUserRequest) {
                await User.updateOne({
                    _id: userId
                }, {
                    $pull: {
                        acceptFriend: myId
                    }
                })
            }

            const existUserRespond = await User.findOne({
                _id: myId,
                request: userId
            })

            if (existUserRespond) {
                await User.updateOne({
                    _id: myId
                }, {
                    $pull: {
                        request: userId
                    }
                })
            }

            const infoUser = await User.findOne({
                _id: userId
            })

            const lengthFriendAccept = infoUser.acceptFriend.length

            socket.broadcast.emit('Server_return_length_accept_friend', {
                userId,
                lengthFriendAccept
            })
        })

        socket.on('Client_refuse_add', async (userId) => {
            const myId = res.locals.user.id

            const existUserRequest = await User.findOne({
                _id: myId,
                acceptFriend: userId
            })

            if (existUserRequest) {
                await User.updateOne({
                    _id: myId
                }, {
                    $pull: {
                        acceptFriend: userId
                    }
                })
            }

            const existUserRespond = await User.findOne({
                _id: userId,
                request: myId
            })

            if (existUserRespond) {
                await User.updateOne({
                    _id: userId
                }, {
                    $pull: {
                        request: myId
                    }
                })
            }
        })

        socket.on('Client_accept_add', async (userId) => {
            const myId = res.locals.user.id

            const existUserRequest = await User.findOne({
                _id: myId,
                acceptFriend: userId
            })

            const existUserRespond = await User.findOne({
                _id: userId,
                request: myId
            })

            let roomChat;

            if (existUserRequest && existUserRespond) {
                roomChat = new RoomChat({
                    typeRoom: 'friends',
                    users: [{
                        user_id: myId,
                        role: 'superAdmin'
                    }, {
                        user_id: userId,
                        role: 'superAdmin'
                    }]
                })

                await roomChat.save()
            }

            if (existUserRequest) {
                await User.updateOne({
                    _id: myId
                }, {
                    $pull: {
                        acceptFriend: userId
                    },
                    $push: {
                        friendList: {
                            user_id: userId,
                            room_chat_id: roomChat.id
                        }
                    }
                })
            }

            if (existUserRespond) {
                await User.updateOne({
                    _id: userId
                }, {
                    $pull: {
                        request: myId
                    },
                    $push: {
                        friendList: {
                            user_id: myId,
                            room_chat_id: roomChat.id
                        }
                    }
                })
            }
        })
    })
}