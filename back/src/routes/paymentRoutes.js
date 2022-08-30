const { Router } = require("express")
const paymentRoutes = Router();

const PaymentController = require("../controllers/paymentController")
const PaymentService = require("../Services/PaymentService") 
const PaymentInstance = new PaymentController(new PaymentService())

const { Order, Orderdetail, Product } = require("../db")
//controllers
const { postOrder } = require("../controllers/paymentModelController")

// paymentRoutes.get('/', function(req, res, next){ 

//   Order.
  

// })

paymentRoutes.post("/", function(req, res, next){   
  //Persiste el pedido en la b.d. y devuelve el link de pago.  
  let arr = []
  const idOrder = postOrder(req, res) 
  
  .then((idOrder)=> { 
     const order = Order.findByPk(idOrder,{
      include: [{ model: Orderdetail, include: [Product] }],   
     })      
     
     //.then(order => console.log('--> '+JSON.stringify(order)) )
     .then(order => {
      const filteredOrder = {
        orderId: order.id,
        orderDetail: [
       {
        product: {
          productId: order.orderdetails.map(product=> product.productId),
          title: order.orderdetails.title
        }
      }
    
    ]
       }

       console.log('--> '+JSON.stringify(filteredOrder))
     }) 

     
    
  })

  })

  //{
    //   where: { id: idOrder }
    //   //include: [{ model: Orderdetail, include: [Product] }],
    // });
  
   // order.then((order)=> PaymentInstance.getPaymentLink(req,res).then((link)=> res.status(200).send([{link: link, order: order}])))   
  // .then ((id)=>{    
  // const order = Order.findByPk(id)  
  // })
  // .then((data)=>{console.log(data)})
 

//.then (() => PaymentInstance.getPaymentLink(req,res))      
  
 


module.exports = {
    paymentRoutes
}


