const { request, response } = require('express');

const { Op } = require("sequelize")


const { Product, Subcategory, Favorite, Review, User, Price, Role, Category } = require("../db")

const { createWhereAndOrder } = require("../helpers/createWhereOrder")



const postProduct = async (req = request, res = response) => {
    try {
        const { categoriesId, stock, price } = req.body
        let data = { ...req.body }
        if (stock && !/^[0-9]+$/.test(stock)) {
            return res.status(400).json({ errors: { stock: "no existe una subcategoria con el id ingresado" } })
        }
        const newProduct = await Product.create({
            ...data,
            stock,
            price: {
                originalprice: price
            }
        }, { include: [Category, Price] })
        await newProduct.addCategories(categoriesId)
        res.status(201).json(newProduct)

    } catch (error) {
        res.status(400).json({ error: error.message })
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
        offset,
        include: Price
    })
    const totalPages = Math.ceil(count / limit)

    return res.status(200).json({ totalPages, currentPage, totalResults: count, data: rows })

}


const getProductById = async (req = request, res = response) => {
    const { id } = req.params;

    Product.findByPk(id, {
        include: [
            { model: Favorite },
            { model: Review, attributes: ["id", "score", "description"], include: User },
            { model: Category, attributes: ["id", "name"] },
            { model: Price}
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

const getProductsFilter = async (req, res) => {
    const { name, priceOrder, min, max, categoryId } = req.query
    try {
        // console.log(name, priceOrder, min, max)
        //Armando el obj price
        let objPrice = {
            model: Price,
            as: 'price',
            where: {}
        }
        //Agrego, si existe, un mínimo
        if(!!min) {
            objPrice = {
                ...objPrice,
                where: {
                    ...objPrice.where,
                    originalprice: {
                        ...objPrice.where.originalprice,
                        [Op.gt]: min
                    }
                }
            }
        }
        //Agrego, si existe, un máximo
        if(!!max) {
            objPrice = {
                ...objPrice,
                where: {
                    ...objPrice.where,
                    originalprice: {
                        ...objPrice.where.originalprice,
                        [Op.lt]: max
                    }
                }
            }
        }
        let greatCondition = {
            // attributes: ['title'],
            include: []
        }
        greatCondition.include.push(objPrice)
        //Armo y agrego, si existe, un filtrado por categoría
        if(!!categoryId) {
            let objCategory = {
                model: Category,
                attributes: ['name'],
                through: {
                    attributes: []
                },
                where: {
                    id: categoryId
                },
            }
            greatCondition.include.push(objCategory)
        }
        //Agrego, si existe, un orden
        if(!!priceOrder) {
            greatCondition = {
                ...greatCondition,
                order: [['price', 'originalprice', priceOrder]]
            }
        }
        //Agrego, si existe, un filtrado por orden
        if(!!name) {
            greatCondition = {
                ...greatCondition,
                where: {
                    title: {
                        [Op.iLike]: `%${name}%`
                    }
                }
            }
        }    
            //MODELO
        // let greatCondition = {
        //     attributes: ['title'],
        //     include: [
        //         {
        //             model: Category,
        //             attributes: ['name'],
        //             through: {
        //                 attributes: []
        //             },
        //             where: {
        //                 id: categoryId
        //             },
        //         },
        //         {
        //             model: Price,
        //             attributes: ['originalprice'],
        //             order: ['originalprice', 'asc'],
        //             where: {
        //                 originalprice: {
        //                     [Op.lt]: 7000,
        //                     [Op.gt]: 6000,
        //                 },
        //             },
        //             as: 'price'
        //         },
        //     ],
        //     order: [['price', 'originalprice', 'desc']]
        // }
        const resul = await Product.findAll(greatCondition)
        res.status(200).json(resul)
    } catch (err) {
        res.status(500).json({ error: err.message})
    }
}

const getReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll({
            include: [
            { model: User, attributes: ["uid", "username", "image"], include: [
                { model: Role, as: "role" },
            ]},
            { model: Product, attributes: ["id", "title", "images"] },
        ]});
         res.status(200).json(reviews)
    } catch(error) {
         res.status(500).json({ error: error.message})
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
    updateReview,
    getProductsFilter,
    getReviews,
}