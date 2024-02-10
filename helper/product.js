module.exports.priceNew = (product) => {
    product.forEach(item => {
        item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(2)
    })

    return product
}