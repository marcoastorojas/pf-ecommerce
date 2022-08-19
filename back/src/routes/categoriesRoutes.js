const { Router } = require("express")
const { Category, Subcategory, Product } = require("../db")
const categoriesroutes = Router()
const { Op } = require("sequelize")

categoriesroutes.post("/", async (req, res) => {
    const { name } = req.body
    const repetido = await Category.findOne({ where: { name } })
    if (repetido) return res.status(400).json({ error: "repetido" })
    const nuevaCategoria = await Category.create({ name })
    res.status(201).json({ nuevaCategoria })
})

categoriesroutes.get("/", async (req, res) => {
    const { name } = req.query
    console.log(name);
    if (name) {
        const categoria = await Category.findOne({ where: { name: { [Op.iLike]: name } } })
        return res.status(200).json(categoria)
    }
    const lista = await Category.findAll({
        include: [{ model: Subcategory, as: "subcategories" }]
    })
    res.status(200).json({ data: lista })
})

module.exports = { categoriesroutes }
