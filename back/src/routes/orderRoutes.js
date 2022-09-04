const { Router } = require("express")
const orderRoutes = Router();

//controllers
const { getOrderbyUser } = require("../controllers/orderController")
//middleware
// const { validIdParam } = require("../middlewares/validIdParam")

orderRoutes.post("/",
  (req, res, next) => {
    const { userId } = req.body
    const expReg = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

    if (userId && !expReg.test(userId)) return res.status(400).json({
      errors: {
        userId: " el id debe ser un uuid valido"
      }
    })

    next()
  }
  , getOrderbyUser)

module.exports = {
  orderRoutes,
};
