module.exports.priceNew = (product) => {
    product.forEach(item => {
        item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(2)
    })

    return product
}

module.exports.priceNewProduct = (product) => {
    product.priceNew = (product.price * (100 - product.discountPercentage) / 100).toFixed(2)
    return product
}