module.exports.index = (req, res) => {
    res.render('Client/Pages/Products/index', {
        titlePage: "Danh sách sản phẩm",
    })
}