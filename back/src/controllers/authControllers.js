

const {request,response} = require("express")

const registerUser = (req= request,res=response) => {
    res.send ( "creando user")
    
}

module.exports={
    registerUser
}