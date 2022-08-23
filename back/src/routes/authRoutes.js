

const { Router } = require("express")
const { registerUser, postRol, getAllUsers, infoUser, loginUser } = require("../controllers/authControllers")
const { validBodyLogin } = require("../middlewares/validBodyLogin")
const { validBodyPostUser } = require("../middlewares/validBodyPostUser")
const { validIdParam } = require("../middlewares/validIdParam")
const authRoutes = Router()

authRoutes.post("/rol", postRol)
authRoutes.post("/signup", validBodyPostUser, registerUser)
authRoutes.post("/signin", validBodyLogin,loginUser)
authRoutes.get("/users", getAllUsers)
authRoutes.get("/users/:id", validIdParam, infoUser)


module.exports = { authRoutes }
