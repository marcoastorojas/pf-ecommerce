const { Router } = require("express")
const { Subcategory, Category, Product } = require("../db")
const subCategoriesroutes = Router()
const { Op } = require("sequelize")



subCategoriesroutes.post("/", async (req, res) => {
    const { name, categoryId } = req.body
    if (!name || !categoryId) return res.status(400).json("faltan datos")
    const expReg = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (!expReg.test(categoryId)) return res.status(400).json({ error: "debe ser un uuid valido" })

    const category = await Category.findByPk(categoryId)
    if (!category) return res.status(400).json("no existe una categoria con el id ")

    const repetido = await Subcategory.findOne({ where: { name: { [Op.iLike]: name } } })
    if (repetido) return res.status(400).json({ error: "ya esta repetido" })

    const newSubcategory = await Subcategory.create(req.body)
    res.status(201).json(newSubcategory)

})


subCategoriesroutes.get("/", async (req, res) => {
    const { name } = req.query
    if (name) {
        const subcategory = await Subcategory.findOne({ where: { name: { [Op.iLike]: name } } })
        return res.status(200).json(subcategory)
    }
    const lista = await Subcategory.findAll({
        include: [{ model: Product, as: "products", attributes: ['id', 'title', 'images', 'model', 'brand', 'subcategoryId'] }]
    })
    res.status(200).json({ data: lista })
})


module.exports = { subCategoriesroutes }