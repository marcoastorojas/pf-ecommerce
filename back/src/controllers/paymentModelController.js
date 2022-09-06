const { Op } = require("sequelize");
const { Order, Orderdetail } = require("../db");
const { request, response } = require("express"); 


const postOrder =  async  (req = request, res = response) => {
  var order, orderid
  getOrder = function() {

  const userId = req.body.user_id;  
 
  var promise = new Promise(function(resolve, reject) {  

      // busco la última orden abierta.
      order = Order.findOne({
        where: {
          userId: userId,
          orderStatusId: "0b52bfb5-349e-4b51-95ca-9fb9fbd2dea7",
        },
      })
      resolve(order);
    });
  
  return promise;
  };
  
  return getOrder().then(async function(order) {

      if (order !== null) {      
        const orderDetail = req.body.products.map((product) => {
          return (product = {
            productId: product.product.id,
            quantity: product.amount,
            price: product.product.price,
            orderId: order.id,
          });
        });
        newOrderDetail = Orderdetail.bulkCreate(orderDetail);
        orderid = order.id

      } else {
        
        let order = {
          userId: req.body.user_id,
          orderStatusId: "0b52bfb5-349e-4b51-95ca-9fb9fbd2dea7",
        }

        const neworder = await Order.create(order);      
        orderid = neworder.id
      
        const orderDetail = req.body.products.map((product) => {
          return (product = {
            productId: product.product.id,
            quantity: product.amount,
            price: product.product.price,
            orderId: neworder.id,
          });
        });

        const newOrderDetail = await Orderdetail.bulkCreate(orderDetail);           
  
      }    
      return orderid
  }) 
} 
           

module.exports = { postOrder };
  

