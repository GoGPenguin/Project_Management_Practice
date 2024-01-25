module.exports = (query, countProducts, limitItem = 4) => {
    let objectPagination = {
        currentPage: 1,
        limitItem: limitItem,
    }

    objectPagination.currentPage = parseInt(query.page)

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem

    const totalPage = Math.ceil(countProducts / objectPagination.limitItem)
    objectPagination.totalPage = totalPage

    return objectPagination
}