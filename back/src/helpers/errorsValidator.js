

const reduceErrors = (errorsObject) => {
    const errors = Object.entries(errorsObject) //{ name:"" ,email:"ya esta registrado",role:"",password:"este campo es obligatorio"}
        .filter(([key, value]) => value) // [["email","ya esta registrado"],["password","este campo es obligatorio"]] 
        .reduce((acc, entries) => ({ ...acc, [entries[0]]: entries[1] }), {}) // {email:"ya esta registrado",password:"este campo es obligatorio"}

    return JSON.stringify(errors) === JSON.stringify({}) ? null : errors

}

module.exports={reduceErrors}