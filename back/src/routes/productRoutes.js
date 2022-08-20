const { Router } = require("express")
const { Op, fn, col } = require("sequelize")

const productRoutes = Router()
const { Product, Subcategory } = require("../db")
const { createWhereAndOrder } = require("../helpers/createWhereOrder")
const { validQueryGetProducts } = require("../middlewares/validQueryGetProducts")

productRoutes.post("/", async (req, res) => {
    try {
        const { subcategoryId, title, model, brand, images, price, description } = req.body
        if (!subcategoryId || !title || !model || !brand || !images || !description || !price) return res.status(400).json("faltan datos")
        const expReg = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
        if (!expReg.test(subcategoryId)) return res.status(400).json({ error: "debe ser un uuid valido" })

        const subCategory = await Subcategory.findByPk(subcategoryId)
        if (!subCategory) return res.status(400).json("no existe una subcategoria con el id ")

        const repetido = await Product.findOne({ where: { title: { [Op.iLike]: title } } })
        if (repetido) return res.status(400).json({ error: "ya esta repetido" })

        const newProduct = await Product.create(req.body)
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(500).json({ error: error })
    }

})


productRoutes.get('/:id', (req, res) => {
    const id = req.params.id;
    const expReg = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (!expReg.test(id)) return res.status(400).json({ error: "el id debe ser un uui valido" })

    Product.findByPk(id)
        .then((data) => {
            (!data) ?
                res.status(404).json({ error: `no hay ningun producto para el id ${id}` }) :
                res.status(200).json(data)
        })
        .catch((err) => res.send(err))

})


//validando los datos ingresados por el query con un middleware "validQueryGetProducts"
productRoutes.get("/", validQueryGetProducts, async (req, res) => {

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

})

//get products by categoryId

//validando los datos ingresados por el query con un middleware "validQueryGetProducts"
productRoutes.get('/category/:id', validQueryGetProducts, async (req, res) => {
    const { limit = 30, page = 1 } = req.query
    const currentPage = Number(page)
    const offset = limit * (currentPage - 1)

    //generando el where y el order con una funcion helper que los crea mediante el query
    const { where, order } = createWhereAndOrder(req.query)


    let products
    const categoryId = req.params.id;
    const subCategory = await Subcategory.findAll({ where: { categoryId: categoryId } })

    subCategory.length ?
        (
            products = await Product.findAndCountAll({
                //conocando el where y el order creados anteriormente
                where: { subcategoryId: subCategory[0].id, ...where },
                order,
                offset,
                limit
            }),
            res.json({
                totalPages: Math.ceil(products.count / limit),
                currentPage,
                totalResults: products.count,
                data: products.rows,
            })
        )

        : res.send('No hay resultados.')

})

productRoutes.get('/subcategory/:id', validQueryGetProducts, async (req, res) => {
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


})


module.exports = { productRoutes }
Footer