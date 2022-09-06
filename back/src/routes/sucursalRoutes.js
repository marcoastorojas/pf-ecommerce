const { Router } = require("express")
const { Sucursal,Order } = require("../db")
const sucursalRoutes = Router()
const { Op } = require("sequelize")



sucursalRoutes.post("/", async (req, res) => {
    const { name, lat, lng } = req.body
    if (!name || !lat || !lng) return res.status(400).json("faltan datos")
    try {
            const newSucursal = await Sucursal.create(req.body)
        
            res.status(201).json(newSucursal)
    } catch (error) {
            res.status(400).json(error.message)
    }
})


sucursalRoutes.get("/", async (req, res) => {
    try {
        const allSucursal = await Sucursal.findAll({include:Order})
        res.status(201).json(allSucursal)
    } catch (error) {
        res.status(400).json(error.message)
    }
})


module.exports = { sucursalRoutes }