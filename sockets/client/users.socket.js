const User = require('../../models/user.model')

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
                            room_chat_id: ""
                        }
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
                    },
                    $push: {
                        friendList: {
                            user_id: myId,
                            room_chat_id: ""
                        }
                    }
                })
            }
        })
    })
}