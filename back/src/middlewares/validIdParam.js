
const validIdParam = (req, res, next) => {
    const { id } = req.params
    const expReg = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

    if (id && !expReg.test(id)) return res.status(400).json({
        errors: {
            id: " el id debe ser un uuid valido"
        }
    })

    next()
}

module.exports={
    validIdParam
}