const { Router } = require("express")
const { Op, fn, col } = require("sequelize")

const productRoutes = Router()
const { Product, Subcategory } = require("../db")

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


productRoutes.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    if (id) {
        await Product.findByPk(id)
            .then((data) => res.status(200).json({ data }))
            .catch((err) => res.send(err))
    }
})



productRoutes.get("/", async (req, res) => {

    const { name, max, min, asc = false, desc = false, limit = 30, page = 1 } = req.query
    const currentPage = Number(page)
    if (limit && !/^[0-9]+$/.test(limit)) return res.status(400).json({ error: "el limite debe ser un numero" })
    if (min && !/^[0-9]+$/.test(min)) return res.status(400).json({ error: "el minimo debe ser un numero" })
    if (max && !/^[0-9]+$/.test(max)) return res.status(400).json({ error: "el maximo debe ser un numero" })
    if (page && !/^[0-9]+$/.test(page)) return res.status(400).json({ error: "la pagina debe ser un numero" })
    const offset = limit * (currentPage - 1)

    let where = { [Op.or]: [] }
    let order = []
    if (max || min) { where.price = { [Op.between]: [min || 0, max || 10000000] } }
    if (name) {
        where[Op.or][0] = { title: { [Op.iLike]: `%${name}%` } }
        where[Op.or][1] = { model: { [Op.iLike]: `%${name}%` } }
    } else { delete where[Op.or] }


    if (asc && !desc) { order = [['price', 'ASC']] }
    else if (desc && !asc) { order = [['price', 'DESC']] }

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
productRoutes.get('/category/:idCategory', async (req, res) => {
    let products
    const categoryId = req.params.idCategory;
    const subCategory = await Subcategory.findAll({ where: { categoryId: categoryId } })

    subCategory.length ?
        (
            products = await Product.findAll({ where: { subcategoryId: subCategory[0].id } }),
            res.send(products)
        )

        : res.send('No hay resultados.')

})



module.exports = { productRoutes }
