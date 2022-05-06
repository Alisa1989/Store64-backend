const products = require("../database").products;


function getProducts() {
    return products
}

function getProductById(id) {
    return products.find(p => p.id == id)
}

function createProduct(data) {
    const payload = {
        id: String(products.length + 1),
        ...data
    }

    products.push(payload)
    return payload
}

function updateProduct(id, data) {
    const index = products.findIndex(p => p.id == id)
    products[index] = {
        ...products[index],
        ...data
    }

    return products[index]
}

function deleteProduct(id) {
	users = users.filter(u => u.id != id)
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}

