const { Router } = require("express")
const paymentRoutes = Router();
const PaymentController = require("../controllers/paymentController")
const PaymentService = require("../Services/PaymentService") 

const PaymentInstance = new PaymentController(new PaymentService())

paymentRoutes.get('/', function(req, res, next){   
    PaymentInstance.getPaymentLink(req,res)
   
})

module.exports = {
    paymentRoutes
}



 

 