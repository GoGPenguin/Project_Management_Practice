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

    // request.request.push(userId)

    // request.request.push(request.acceptFriend)

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