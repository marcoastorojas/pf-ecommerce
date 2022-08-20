const { request, response } = require('express');

const postProduct = (req = request, res = response) => {
    res.send("postProduct")
}
const getProducts = async(req = request, res = response) => {
    
    res.send("getProducts")
}
const getProduct = (req = request, res = response) => {
    res.send("getProduct")
}
const updateProduct = (req = request, res = response) => {
    res.send("updateProduct")
}
const deleteProduct = (req = request, res = response) => {
    res.send("deleteProduct")   
}
module.exports = {
    postProduct,
    getProducts,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}