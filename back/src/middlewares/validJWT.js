const { request, response } = require("express")
const jwt = require("jsonwebtoken")

const validJWT = (req = request, res = response, next) => {
    const token = req.header('token')
    if (!token) return res.status(401).json(
        { errors: { token: "el token es necesario para esta ruta" } }
    )

    try {
        const data = jwt.verify(token, process.env.KEY_JWT)
        req.userJWT = data
        next()
    } catch (error) {
        return res.status(401).json({ errors: { token: "token no valido" } })
    }
}



module.exports = {
    validJWT
}
