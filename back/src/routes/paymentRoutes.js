const { Router } = require("express")
const paymentRoutes = Router();
const PaymentController = require("../controllers/paymentController")
const PaymentService = require("../Services/PaymentService") 
const PaymentInstance = new PaymentController(new PaymentService())

//controllers
const { postOrder } = require("../controllers/paymentModelController")

paymentRoutes.get('/', function(req, res, next){   
    PaymentInstance.getPaymentLink(req,res)   
})

paymentRoutes.post("/", postOrder)

module.exports = {
    paymentRoutes
}



 

 