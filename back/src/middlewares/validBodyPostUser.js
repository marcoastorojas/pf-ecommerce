
const { request, response } = require("express")
const { User, Role } = require("../db")


validBodyPostUser = async (req = request, res = response, next) => {
    const { email, password, role, username = "" } = req.body
    let errors = { name: "",role:"", email: "", password: "", username: "" }

    //Obteniendo validacion por espacios vacios
    Object.keys(errors).forEach((key) => { // esto genera un error en la posicion que en el req no tiene valor   
        if (!req.body[key]) {             //  ejemplo {name:"",email:"este campo es obligatorio",password:""}
            errors[key] = "este campo es obligatorio"
        }
    })


    //Validand userName 
    const usuario = await User.findOne({ where: { username } })
    if (usuario) errors.username = "el usuario ya existe"

    //Validando que el email sea unico
    const user = await User.findOne({ where: { email } })
    if (user) errors.email = "el email ya esta registrado"

    //validando email valido 
    let re = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/g
    if (!email.match(re)) errors.email = "el email deve ser valido (@  .com)"

    // minimo requerido contraseña
    if (password.length < 6) errors.password = "la contraseña debe almenos tener 6 caracteres"


    //validando Roles
    // const validRoles = ["ADMIN_ROLE", "USER_ROLE", "SELLER_ROLE"]
    const validRoles = await Role.findAll()
    if (!validRoles.find((validRole) => validRole.name === role)) {
        errors.role = `el rol: ${role} no esta contenido en los roles validos ${validRoles.map(rol => rol.name)}`
    }

    errors = Object.entries(errors) //{ name:"" ,email:"ya esta registrado",role:"",password:"este campo es obligatorio"}
        .filter(([key, value]) => value) // [["email","ya esta registrado"],["password","este campo es obligatorio"]] 
        .reduce((acc, entries) => ({ ...acc, [entries[0]]: entries[1] }), {}) // {email:"ya esta registrado",password:"este campo es obligatorio"}



    //retornando un 400 si contiene errores
    if (JSON.stringify(errors) !== JSON.stringify({})) return res.status(400).json({ errors })
    // console.log(errors)
    next()
}


module.exports = {
    validBodyPostUser
}