const User = require('../../models/user.model')
const {
    usersSocket
} = require('../../sockets/client/users.socket')

module.exports.notFriend = async (req, res) => {
    usersSocket(res)
    const userId = res.locals.user.id
    const request = await User.findOne({
        _id: userId
    })

    let friendList = []

    request.friendList.forEach(item => {
        friendList.push(item.user_id)
    })

    const users = await User.find({
        $and: [{
                _id: {
                    $ne: userId
                }
            },
            {
                _id: {
                    $nin: request.request
                }
            },
            {
                _id: {
                    $nin: request.acceptFriend
                }
            },
            {
                _id: {
                    $nin: friendList
                }
            }
        ],
        // _id: {
        //     $nin: request.request
        // },
        deleted: false,
        status: 'active'
    }).select('avatar fullName')

    res.render('Client/Pages/users/not-friend', {
        titlePage: 'Người dùng',
        users: users
    })
}

module.exports.request = async (req, res) => {
    usersSocket(res)
    const userId = res.locals.user.id

    const myUser = await User.findOne({
        _id: userId
    })

    const request = myUser.request
    // const acceptFriend = myUser.acceptFriend

    const users = await User.find({
        _id: {
            $in: request
        },
        status: 'active',
        deleted: false
    }).select('id avatar fullName')

    res.render('Client/Pages/users/request', {
        titlePage: 'Lời mời kết bạn đã gửi',
        users: users
    })
}


module.exports.accept = async (req, res) => {
    usersSocket(res)
    const userId = res.locals.user.id

    const myUser = await User.findOne({
        _id: userId
    })

    const acceptFriend = myUser.acceptFriend

    const users = await User.find({
        _id: {
            $in: acceptFriend
        },
        status: 'active',
        deleted: false
    }).select('id avatar fullName')

    res.render('Client/Pages/users/accept', {
        titlePage: 'Lời mời kết bạn',
        users: users
    })
}


module.exports.friend = async (req, res) => {
    usersSocket(res)
    const userId = res.locals.user.id

    const myUser = await User.findOne({
        _id: userId
    })

    const friendList = myUser.friendList

    const friends = friendList.map(item => item.user_id)

    const users = await User.find({
        _id: {
            $in: friends
        },
        status: 'active',
        deleted: false
    }).select('id avatar fullName statusOnline')

    users.forEach(user => {
        const infoUser = friendList.find(item => item.user_id == user.id)
        user.roomChatId = infoUser.room_chat_id
    })

    res.render('Client/Pages/users/friend', {
        titlePage: 'Bạn bè',
        users: users
    })
}