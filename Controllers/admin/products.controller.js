const Product = require('../../models/product.model')

module.exports.products = async (req, res) => {
    let filterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },         {
            name: "Hoạt động",
            status: "active",
            class: ""
        },         {
            name: "Dừng hoạt động",
            status: "inactive",
            class: ""
        }, 
    ]

    let find = {
        deleted: false
    }

    let searchKey = ""

    if (req.query.status){
        const index = filterStatus.findIndex(item => item.status == req.query.status)
        find.status = filterStatus[index].status
        filterStatus[index].class = "active"
    }
    else {
        filterStatus[0].class = "active"
    }

    if (req.query.keyword) {
        const regex = new RegExp(req.query.keyword, i);

        find.title = regex
        searchKey = req.query.keyword
    }

    const data = await Product.find(find);

    res.render('admin/pages/products/index', {
        pageTitle: "PRODUCTS",
        data: data,
        filterStatus: filterStatus,
        searchKey: searchKey,
    })
}

