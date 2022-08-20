

const validQueryGetProducts = (req, res, next) => {

    const { id } = req.params
    const expReg = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

    if (id && !expReg.test(id)) return res.status(400).json({ error: "el id debe ser un uuid valido" })


    const { max, min, limit = 30, page = 1 } = req.query
    if (limit && !/^[0-9]+$/.test(limit)) return res.status(400).json({ error: "el limite debe ser un numero" })
    if (min && !/^[0-9]+$/.test(min)) return res.status(400).json({ error: "el minimo debe ser un numero" })
    if (max && !/^[0-9]+$/.test(max)) return res.status(400).json({ error: "el maximo debe ser un numero" })
    if (page && !/^[0-9]+$/.test(page)) return res.status(400).json({ error: "la pagina debe ser un numero" })

    next()
}

module.exports = {
    validQueryGetProducts
}