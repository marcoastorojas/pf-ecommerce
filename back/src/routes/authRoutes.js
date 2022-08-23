

const { Router } = require("express")
const { registerUser } = require("../controllers/authControllers")
const authRoutes = Router()

authRoutes.post("/signup",registerUser)


module.exports = { authRoutes }
