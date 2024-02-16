const User = require('../../models/user.model')
const RoomChat = require('../../models/room-chat.model')

module.exports.index = async (req, res) => {


    res.render('Client/Pages/rooms-chat/index', {
        titlePage: "Danh sách chat",
    })
}

module.exports.create = async (req, res) => {
    const listFriend = res.locals.user.friendList

    for (const friend of listFriend) {
        const infoUser = await User.findOne({
            _id: friend.user_id
        }).select('fullName avatar')

        friend.infoFriend = infoUser
        console.log(friend.infoFriend.fullName)
    }

    res.render('Client/Pages/rooms-chat/create', {
        titlePage: "New chat",
        friends: listFriend
    })
}

module.exports.createRoom = async (req, res) => {
    const title = req.body.title
    const usersId = req.body.usersId

    const dataChat = {
        title: title,
        typeRoom: 'group',
        users: [],
    }

    usersId.forEach(user => {
        dataChat.users.push({
            user_id: user,
            role: 'user'
        })
    })

    dataChat.users.push({
        user_id: res.locals.user.id,
        role: 'superAdmin'
    })

    const roomChat = new RoomChat(dataChat)

    await roomChat.save()

    res.redirect(`/chat/${roomChat.id}`)
}