
const { Router } = require("express")
const { authRoutes } = require("./authRoutes")
const { categoriesroutes } = require("./categoriesRoutes")
const { productRoutes } = require("./productRoutes")
const { subCategoriesroutes } = require("./subCategorieRoutes")
const { paymentRoutes } = require("./paymentRoutes")
const { orderRoutes } = require("./orderRoutes")
const { webHookRoutes } = require("./webHookRoutes")

const routes = Router()

routes.use("/categories", categoriesroutes)
routes.use("/subCategories", subCategoriesroutes)
routes.use("/products", productRoutes)
routes.use("/auth", authRoutes)
routes.use("/payment", paymentRoutes)
routes.use("/order", orderRoutes)
routes.use("/webHook", webHookRoutes)

module.exports = { routes }
