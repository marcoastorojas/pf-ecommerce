

const { Router } = require("express")
const { registerUser, postRol, getAllUsers, infoUser, loginUser, renewJWT, googleAuth, getRol, getRols } = require("../controllers/authControllers")
const { validBodyLogin } = require("../middlewares/validBodyLogin")
const { validBodyPostUser } = require("../middlewares/validBodyPostUser")
const { validIdParam } = require("../middlewares/validIdParam")
const { validJWT } = require("../middlewares/validJWT")
const authRoutes = Router()

authRoutes.post("/rol", postRol)
authRoutes.get("/rol", getRols)
authRoutes.get("/rol/:id", validIdParam, getRol)

authRoutes.post("/signup", validBodyPostUser, registerUser)
authRoutes.post("/signin", validBodyLogin, loginUser)
authRoutes.get("/users", getAllUsers)
authRoutes.get("/users/:id", validIdParam, infoUser)

authRoutes.get("/renew", validJWT, renewJWT)
authRoutes.post("/google", googleAuth)


module.exports = { authRoutes }
