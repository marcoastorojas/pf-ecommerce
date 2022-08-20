const { Router } = require("express")
//controllers
const {
    postProduct,
    getProducts,
    getProductsByCategoryId,
    getProductsBySubcategoryId,
    getProductById } = require("../controllers/productControllers")
    
    //middlewares
    const { validQueryGetProducts } = require("../middlewares/validQueryGetProducts")
    const { validIdParam } = require("../middlewares/validIdParam")


const productRoutes = Router()

productRoutes.post("/", postProduct)


productRoutes.get('/:id', validIdParam, getProductById)

//validando los datos ingresados por el query con un middleware "validQueryGetProducts"
productRoutes.get("/", validQueryGetProducts, getProducts)

//validando los datos ingresados por el query con un middleware "validQueryGetProducts"

productRoutes.get('/category/:id', validIdParam, validQueryGetProducts, getProductsByCategoryId)

//validando los datos ingresados por el query con un middleware "validQueryGetProducts"
productRoutes.get('/subcategory/:id', validIdParam, validQueryGetProducts, getProductsBySubcategoryId)


module.exports = { productRoutes }
