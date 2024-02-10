module.exports.index = async (req, res) => {

    res.render('Client/Pages/Home/index', {
        titlePage: "Trang chủ",
    })
}