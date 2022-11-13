const { Router } = require("express")
const paymentRoutes = Router();

var http = require('http')
var fs = require('fs');


const PaymentController = require("../controllers/paymentController")
const PaymentService = require("../Services/PaymentService") 
const PaymentInstance = new PaymentController(new PaymentService())

const { Order, Orderdetail, OrderStatus, Product, User, Sucursal } = require("../db")

//controllers
const { postOrder } = require("../controllers/paymentModelController");
const Price = require("../models/Price");

paymentRoutes.post("/", async function (req, res, next) {
  
  let arr = [];
  console.log("paso aqui")
  const orderid = await postOrder(req, res)
  console.log("paso aqui 2")
  console.log('orderid-->'+ orderid)
  const orderFounded = await Order.findByPk(orderid,  
  {  
    include: [{ model: OrderStatus }, { model: Orderdetail, include: [Product] }],
  })
  
  if (orderFounded){
    console.log('orderFounded-->'+ JSON.stringify(orderFounded))
    const user = await User.findOne({ where: { uid: orderFounded.userId } });
    const sucursal = await Sucursal.findOne({ where: { id: orderFounded.sucursalId } });

    const filteredOrder = {
  
    orderId: orderFounded.id,
    orderDate: orderFounded.createdAt,
    orderStatusId: orderFounded.orderStatusId,
    orderStatusDescription: orderFounded.orderStatus.description,
    user: {
    id: user.uid,
    userName: user.username,
    email: user.email,
    },    
    orderDetail: orderFounded.orderdetails.map((product) => {
      return {
        idProduct: product.productId,
        title: product.product.title,
        quantity: product.quantity,
        price: product.price       
      }
  })

  }
console.log('filteredOrder-->'+filteredOrder)
  const link = await PaymentInstance.getPaymentLink(req, res)  
  res.status(200).send([{ link: link, order: filteredOrder }])  

}
})

  //     const user = await User.findOne({ where: { uid: orderFounded.userId } });
//     //const sucursal = await Sucursal.findOne({ where: { id: orderFounded.sucursalId } });
    
//  //console.log('orderFounded---->'+JSON.stringify(orderFounded))


//     const filteredOrder = {
  
//     orderId: orderFounded.id,
//     orderDate: orderFounded.createdAt,
//     orderStatusId: orderFounded.orderStatusId,
//     orderStatusDescription: orderFounded.orderStatus.description,
//     user: {
//     id: user.uid,
//     userName: user.username,
//     email: user.email,
//     },    
//     orderDetail: orderFounded.orderdetails.map((product) => {
//       return {
//         idProduct: product.productId,
//         title: product.product.title,
//         quantity: product.quantity,
//        // price: product.price
//        //price: product.product.price.originalprice
//       };

//   }
// )} 
// //console.log('--->'+ JSON.stringify(filteredOrder));
//   link = PaymentInstance.getPaymentLink(req, res)
//   .then((link) =>{   
//    res.status(200).send([{ link: link, order: filteredOrder }]) 
//   })
//   }
   

 
module.exports = {
  paymentRoutes,
};
 
