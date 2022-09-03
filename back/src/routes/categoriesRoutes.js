const { Router } = require("express")
const { Category, Subcategory, Product } = require("../db")
const categoriesroutes = Router()
const { Op } = require("sequelize")

categoriesroutes.post("/", async (req, res) => {
    const { name, active } = req.body
    let categorie = {
        name
    }
    if(!name) {
        return res.status(400).json({ error: "falta nombre" })
    }
    if(!!active) {
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
    // if (name) {
    //     const categoria = await Category.findOne({ where: { name: { [Op.iLike]: name } } })
    //     return res.status(200).json(categoria)
    // }
    // const lista = await Category.findAll({
    //     include: [
    //         { model: Subcategory, as: "subcategories" }, 
    //         // { model: Product, as: "products",attributes: ['id','title', 'images','model','brand','subcategoryId'] }
    //     ],
    // })
    let whereCond = {}
    // console.log(onlyActive, !!onlyActive)
    if (!!onlyActive) {
        whereCond = {
            active: onlyActive.toString()
        }
    }
    const categories = await Category.findAll({
        where: whereCond
    })
    // console.log(whereCond)
    // res.status(200).json({ data: lista })
    res.status(200).json({data: categories})
})

module.exports = { categoriesroutes }
