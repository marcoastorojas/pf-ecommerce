const { Router } = require("express")
const orderRoutes = Router();
 
//controllers
const { getOrderbyUser } = require("../controllers/orderController")
//middleware
const { validIdParam } = require("../middlewares/validIdParam")

orderRoutes.get("/", validIdParam, getOrderbyUser)

module.exports = {
  orderRoutes,
};
 