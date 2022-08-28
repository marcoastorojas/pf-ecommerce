const { Router } = require("express")
const paymentRoutes = Router();

const PaymentController = require("../controllers/paymentController")
const PaymentService = require("../Services/PaymentService") 
const PaymentInstance = new PaymentController(new PaymentService())

//controllers
const { postOrder } = require("../controllers/paymentModelController")

paymentRoutes.get('/', function(req, res, next){ 
    //Devuelve link de pago.
    PaymentInstance.getPaymentLink(req,res)  
})

paymentRoutes.post("/", function(req, res, next){   
  //Persiste el pedido en la b.d. y devuelve el link de pago.
  postOrder(req, res) 
  .then (() => PaymentInstance.getPaymentLink(req,res))  
})
 
module.exports = {
    paymentRoutes
}



 

 