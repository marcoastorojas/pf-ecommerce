const { Router } = require("express")
const { Op } = require("sequelize")

const productRoutes = Router()
const { Product, Subcategory } = require("../db")

productRoutes.post("/", async (req, res) => {
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

})


productRoutes.get('/:id', async (req, res, next) =>{
    const id = req.params.id;   
    if (id) {
      await Product.findByPk(id)
      .then((data) => res.status(200).json({ data }))
      .catch((err) => res.send(err))     
}
})



productRoutes.get("/", async (req, res) => {
    const name = req.query.name
    if (name) {
        const data = await Product.findAll({ where:{
            [Op.or]:[
                { title: { [Op.iLike]: `%${name}%` } },
                { model: { [Op.iLike]: `%${name}%` } }
            ]
        } })

        return res.status(200).json({ data })
    }
    const lista = await Product.findAll()
    res.status(200).json({ data: lista })
})

//get products by categoryId
productRoutes.get('/category/:idCategory', async (req, res) => {
    let products
    const categoryId = req.params.idCategory;           
    const subCategory = await Subcategory.findAll({where: {categoryId: categoryId}})   
    
    subCategory.length ?
    (
        products = await Product.findAll({where: {subcategoryId: subCategory[0].id}}),
        res.send(products)
    )
    
    : res.send('No hay resultados.')
  
})



module.exports = { productRoutes }
