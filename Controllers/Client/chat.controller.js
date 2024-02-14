// [GET] /chat
module.exports.index = async (req, res) => {
    res.render('Client/Pages/chat/index', {
        titlePage: "Chat",
    })
}