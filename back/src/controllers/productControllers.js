const { Op } = require("sequelize")

const { Product, Subcategory, Favorite, Review, User } = require("../db")
const { createWhereAndOrder } = require("../helpers/createWhereOrder")



const { request, response } = require('express');
const { isValidUUid } = require("../middlewares/isValidUuid");

const postProduct = async (req = request, res = response) => {
    try {

        const { subcategoryId } = req.body

        let data = { ...req.body }
        if (subcategoryId) {
            if (!isValidUUid(subcategoryId)) return res.status(400).json({ errors: { subcategoryId: "debe ser un uuid valido" } })
            const subCategory = await Subcategory.findByPk(subcategoryId)
            if (!subCategory) return res.status(400).json({ errors: { subcategoryId: "no existe una subcategoria con el id ingresado" } })
            data.subcategoryId = subCategory.id
            data.categoryId = subCategory.categoryId
        }

        const newProduct = await Product.create(data)
        res.status(201).json(newProduct)

    } catch (error) {
        res.status(500).json({ error: error })
    }
}



const getProducts = async (req = request, res = response) => {

    const { limit = 30, page = 1 } = req.query
    const currentPage = Number(page)
    const offset = limit * (currentPage - 1)
    //generando el where y el order con una funcion helper que los crea mediante el query
    const { where, order } = createWhereAndOrder(req.query)
    const { count, rows } = await Product.findAndCountAll({
        where,
        order,
        limit,
        offset
    })
    const totalPages = Math.ceil(count / limit)

    return res.status(200).json({ totalPages, currentPage, totalResults: count, data: rows })

}


const getProductById = async (req = request, res = response) => {
    const { id } = req.params;

    Product.findByPk(id, {
        include: [
            { model: Favorite },
            { model: Review }
        ]
    })
        .then((data) => {
            (!data) ?
                res.status(404).json({ error: `no hay ningun producto para el id ${id}` }) :
                res.status(200).json(data)
        })
        .catch((err) => res.send(err))
}

const getProductsByCategoryId = async (req = request, res = response) => {
    const { limit = 30, page = 1 } = req.query
    const currentPage = Number(page)
    const offset = limit * (currentPage - 1)

    //generando el where y el order con una funcion helper que los crea mediante el query
    const { where, order } = createWhereAndOrder(req.query)
    const categoryId = req.params.id

    const products = await Product.findAndCountAll({
        //conocando el where y el order creados anteriormente
        where: { ...where, categoryId },
        order,
        offset,
        limit
    })
    res.json({
        totalPages: Math.ceil(products.count / limit),
        currentPage,
        totalResults: products.count,
        data: products.rows,
    })

}

const getProductsBySubcategoryId = async (req = request, res = response) => {
    const { limit = 30, page = 1 } = req.query
    const currentPage = Number(page)
    const offset = limit * (currentPage - 1)

    //generando el where y el order con una funcion helper que los crea mediante el query
    const { where, order } = createWhereAndOrder(req.query)
    const subcategoryId = req.params.id

    const products = await Product.findAndCountAll({
        //conocando el where y el order creados anteriormente
        where: { ...where, subcategoryId },
        order,
        offset,
        limit
    })
    res.json({
        totalPages: Math.ceil(products.count / limit),
        currentPage,
        totalResults: products.count,
        data: products.rows,
    })
}



const updateProduct = (req = request, res = response) => {
    res.send("updateProduct")
}
const deleteProduct = async (req = request, res = response) => {
    const { id } = req.params
    const existe = await Product.findByPk(id)
    if (!existe) return res.status(400).json({ errors: { id: `el producto con el id ${id} no existe` } })


    await Product.destroy({ where: { id } })
    res.status(301).json({ eliminado: existe })
}
const addFavorite = async (req = request, res = response) => {
    const { id: productId } = req.params
    const { userId: userUid } = req.body
    try {
        if (!await Product.findByPk(productId)) {
            return res.status(400).json({ message: `El producto con el id ${productId} no existe` })
        }
        if (!await User.findByPk(userUid)) {
            return res.status(400).json({ message: `El usuario con el id ${userUid} no existe` })
        }
        if (await Favorite.findOne({ where: { [Op.and]: [{ userUid }, { productId }] } })) {
            return res.status(400).json({ message: "no puede agregar a favoritos dos veces al mismo produto" })
        }
        const newFavorite = await Favorite.create({ productId, userUid })
        res.status(201).json({ message: "conexion creada", newFavorite })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const addReview = async (req = request, res = response) => {
    const { id: productId } = req.params
    const { userId: userUid, score, description } = req.body
    if (!score || !description) return res.status(400).json({ message: "score y description son obligatorioa" })
    try {
        if (!await Product.findByPk(productId)) {
            return res.status(400).json({ message: `El producto con el id ${productId} no existe` })
        }
        if (!await User.findByPk(userUid)) {
            return res.status(400).json({ message: `El usuario con el id ${userUid} no existe` })
        }
        if (await Review.findOne({ where: { [Op.and]: [{ userUid }, { productId }] } })) {
            return res.status(400).json({ message: "solo puede hacer una review por producto" })
        }
        const newReview = await Review.create({ productId, userUid, score, description })
        res.status(201).json({ message: "conexion creada", newReview })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const deleteFavorite = async (req = request, res = response) => {
    const { id: productId } = req.params
    const { userId: userUid } = req.body
    try {
        if (!await Product.findByPk(productId)) {
            return res.status(400).json({ message: `El producto con el id ${productId} no existe` })
        }
        if (!await User.findByPk(userUid)) {
            return res.status(400).json({ message: `El usuario con el id ${userUid} no existe` })
        }
        const favorite = await Favorite.findOne({ where: { [Op.and]: [{ userUid }, { productId }] } })
        if (!favorite) return res.status(400).json({ message: "el producto no esta en la lista de favoritos del usuario" })

        await favorite.destroy()
        res.status(200).json({ message: "eliminado correctamente", deletedConnection: favorite })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const deleteReview = async (req = request, res = response) => {
    const { id: productId } = req.params
    const { userId: userUid } = req.body
    try {
        if (!await Product.findByPk(productId)) {
            return res.status(400).json({ message: `El producto con el id ${productId} no existe` })
        }
        if (!await User.findByPk(userUid)) {
            return res.status(400).json({ message: `El usuario con el id ${userUid} no existe` })
        }
        const review = await Review.findOne({ where: { [Op.and]: [{ userUid }, { productId }] } })
        if (!review) return res.status(400).json({ message: "el usuario no hizo una review del producto" })

        await review.destroy()
        res.status(200).json({ message: "eliminado correctamente", deletedReview: review })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const updateReview = async (req = request, res = response) => {
    const { id: productId } = req.params
    const { description, score, userId: userUid } = req.body
    try {
        if (!score && !description) {
            return res.status(400).json({ message: "deve modificar almenos un valor: score o description" })
        }
        if (!await Product.findByPk(productId)) {
            return res.status(400).json({ message: `El producto con el id ${productId} no existe` })
        }

        if (!await User.findByPk(userUid)) {
            return res.status(400).json({ message: `El usuario con el id ${userUid} no existe` })
        }

        const review = await Review.findOne({ where: { [Op.and]: [{ userUid }, { productId }] } })
        if (!review) return res.status(400).json({ message: "el usuario no hizo una review del producto" })

        if (score) review.score = score
        if (description) review.description = description

        await review.save()
        res.status(200).json({ message: "modificado correctamente", updatedReview: review })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
module.exports = {
    postProduct,
    getProducts,
    getProductById,
    getProductsByCategoryId,
    getProductsBySubcategoryId,
    updateProduct,
    deleteProduct,
    addFavorite,
    addReview,
    deleteFavorite,
    deleteReview,
    updateReview
}