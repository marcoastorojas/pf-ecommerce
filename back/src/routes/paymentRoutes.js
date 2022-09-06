const { Router } = require("express")
const paymentRoutes = Router();

var http = require('http')
var fs = require('fs');


const PaymentController = require("../controllers/paymentController")
const PaymentService = require("../Services/PaymentService") 
const PaymentInstance = new PaymentController(new PaymentService())

const { Order, Orderdetail, OrderStatus, Product, User } = require("../db")

//controllers
const { postOrder } = require("../controllers/paymentModelController");
const Price = require("../models/Price");

paymentRoutes.post("/", async function (req, res, next) {
  let arr = [];
  const orderid = await postOrder(req, res)
  const orderFounded = await Order.findByPk(orderid,  
  {  
    include: [{ model: OrderStatus }, { model: Orderdetail, include: [Product] }],
  })
  
  const user = await User.findOne({ where: { uid: orderFounded.userId } });
  const filteredOrder = {
    orderId: orderFounded.id,
    orderDate: orderFounded.createdAt,
    orderStatusId: orderFounded.orderStatusId,
    orderStatusDescription: orderFounded.orderStatus.description,
    user: {
    id: user.uid,
    userName: user.username,
    email: user.email    
    },

    orderDetail: orderFounded.orderdetails.map((product) => {
      return {
        idProduct: product.productId,
        title: product.product.title,
        quantity: product.quantity,
       // price: product.product.price,
       price: 1
      };

  }
)} 
console.log('--->'+ JSON.stringify(filteredOrder));
  link = PaymentInstance.getPaymentLink(req, res)
  .then((link) =>{          
    //console.log([{ order: JSON.stringify(filteredOrder) }])
    //console.log([{ link: link }])
   res.status(200).send([{ link: link, order: filteredOrder }]) 
  })
})
  
module.exports = {
  paymentRoutes,
};
 