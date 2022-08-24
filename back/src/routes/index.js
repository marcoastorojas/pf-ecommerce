
const { Router } = require("express")
const { authRoutes } = require("./authRoutes")
const { categoriesroutes } = require("./categoriesRoutes")
const { productRoutes } = require("./productRoutes")
const { subCategoriesroutes } = require("./subCategorieRoutes")

const routes = Router()

routes.use("/categories", categoriesroutes)
routes.use("/subCategories", subCategoriesroutes)
routes.use("/products", productRoutes)
routes.use("/auth", authRoutes)

module.exports = { routes }
