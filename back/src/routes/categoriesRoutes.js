const { Router } = require("express")
const { Category, Subcategory, Product } = require("../db")
const categoriesroutes = Router()
const { Op } = require("sequelize")
const { validIdParam } = require("../middlewares/validIdParam")

categoriesroutes.post("/", async (req, res) => {
    const { name, active } = req.body
    let categorie = {
        name
    }
    if (!name) {
        return res.status(400).json({ error: "falta nombre" })
    }
    if (!!active) {
        categorie = {
            ...categorie,
            active
        }
    }
    const repetido = await Category.findOne({ where: { name } })
    if (repetido) return res.status(400).json({ error: "repetido" })
    const nuevaCategoria = await Category.create(categorie)
    res.status(201).json(nuevaCategoria)
})

categoriesroutes.get("/", async (req, res) => {
    const { name, onlyActive } = req.query
    let whereCond = {}
    if (!!onlyActive) {
        whereCond = {
            active: onlyActive.toString()
        }
    }
    if (name) {
        whereCond["name"] = { [Op.iLike]: `%${name}%` }
    }
    const categories = await Category.findAll({
        where: whereCond,
        // include: Product
    })
    // console.log(whereCond)
    // res.status(200).json({ data: lista })
    res.status(200).json({ data: categories })
})

categoriesroutes.delete('/', async (req, res) => {
    try {
        const { categoryId, newStatus } = req.body

        console.log(categoryId, newStatus)

        const categoria = await Category.findByPk(categoryId)

        console.log('cateogira', categoria)

        if (!categoria) return res.status(400).json({ error: 'No existe una categoría con ese id' })

        if (newStatus === 'true' || newStatus === 'false') {
            await Category.update({ active: newStatus.toString() }, { where: { id: categoryId } })
        }
        res.send({ categoryDeleted: categoria })
    } catch (err) {
        res.status(400).json({ error: err })
    }
})
categoriesroutes.get('/:id', validIdParam, async (req, res) => {
    const { id } = req.params
    try {
        const category = await Category.findByPk(id, {
            include: Product
        })
        res.status(200).json(category)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})
module.exports = { categoriesroutes }
