const User = require('../../models/user.model')

module.exports.notFriend = async (req, res) => {
    const userId = res.locals.user

    const users = await User.find({
        _id: { $ne: userId },
        deleted: false,
        status: 'active'
    }).select('avatar fullName')

    res.render('Client/Pages/users/not-friend', {
        titlePage: 'Người dùng',
        users: users
    })
}