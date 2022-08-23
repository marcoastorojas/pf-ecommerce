const { request, response } = require("express")


validBodyLogin = async (req = request, res = response, next) => {
    let errors = { email_user:"", password:"" }

    //validando si existe el email o el user
    //Obteniendo validacion por espacios vacios
    Object.keys(errors).forEach((key) => { // esto genera un error en la posicion que en el req no tiene valor   
        if (!req.body[key]) {             //  ejemplo {name:"",email:"este campo es obligatorio",password:""}
            errors[key] = "este campo es obligatorio"
        }
    })


    errors = Object.entries(errors) //{ name:"" ,email:"ya esta registrado",role:"",password:"este campo es obligatorio"}
        .filter(([key, value]) => value) // [["email","ya esta registrado"],["password","este campo es obligatorio"]] 
        .reduce((acc, entries) => ({ ...acc, [entries[0]]: entries[1] }), {}) // {email:"ya esta registrado",password:"este campo es obligatorio"}

    //retornando un 400 si contiene errores
    if (JSON.stringify(errors) !== JSON.stringify({})) return res.status(400).json({ errors })

    next()
}


module.exports = {
    validBodyLogin
}