const { Product } = require('../db')
const { Op } = require("sequelize")

const validBodyPostProducts = async (req, res, next) => {
    const { price, title } = req.body
    let errors = { title: "", model: "", brand: "", images: "", price: "", userId: "" }

    Object.keys(errors).forEach(param => {
        if (!req.body[param]) {

            errors[param] = "este campo es obligatorio"
        }
    });
    if (!/^[0-9]+$/.test(price)) { errors.price = "el precio debe ser un numero valido" }
    if (Number(price) > 1000000 || Number(price) < 0) { errors.price = "el precio debe estar entre 0 y 1000000" }

    const repetido = await Product.findOne({ where: { title: { [Op.iLike]: title } } })
    if (repetido) { errors.title = "el titulo esta repetido" }

    //elimina los errores vacios
    errors = Object.entries(errors).reduce((acc, [key, value]) => value ? ({ ...acc, [key]: value }) : acc, {})
    if (JSON.stringify(errors) !== JSON.stringify({})) {
        return res.status(400).json({ errors })
    }

    next()
}

module.exports = {
    validBodyPostProducts
}