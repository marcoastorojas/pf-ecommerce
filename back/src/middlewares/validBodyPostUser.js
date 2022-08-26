
const { request, response } = require("express")
const { User, Role } = require("../db")
const { reduceErrors } = require("../helpers/errorsValidator")


validBodyPostUser = async (req = request, res = response, next) => {
    const { email, password, role, username = "" } = req.body
    let errors = { name: "", role: "", email: "", password: "", username: "" }

    //Obteniendo validacion por espacios vacios
    Object.keys(errors).forEach((key) => { // esto genera un error en la posicion que en el req no tiene valor   
        if (!req.body[key]) {             //  ejemplo {name:"",email:"este campo es obligatorio",password:""}
            errors[key] = "este campo es obligatorio"
        }
    })
    if (password && password.length < 6) errors.password = "la contraseña debe almenos tener 6 caracteres"

    //Validand userName 
    const usuario = await User.findOne({ where: { username } })
    if (usuario) errors.username = "el usuario ya existe"

    //validando email valido 
    let re = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/g
    if (email && !email.match(re)) errors.email = "el email deve ser valido (@  .com)"

    //Validando que el email sea unico
    const user = email ? await User.findOne({ where: { email } }) : null
    if (user) errors.email = "el email ya esta registrado"

    // minimo requerido contraseña


    //validando Roles
    // const validRoles = ["ADMIN_ROLE", "USER_ROLE", "SELLER_ROLE"]
    const validRoles = await Role.findAll()
    if (!validRoles.find((validRole) => validRole.name === role)) {
        errors.role = `el rol: ${role} no esta contenido en los roles validos ${validRoles.map(rol => rol.name)}`
    }


    const validErrors2 = reduceErrors(errors)
    if (validErrors2) return res.status(400).json({ errors: validErrors2 })

    next()
}


module.exports = {
    validBodyPostUser
}