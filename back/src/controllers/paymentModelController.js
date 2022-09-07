const { Op } = require("sequelize");
const { Order, Orderdetail } = require("../db");
const { request, response } = require("express"); 


const postOrder =  async  (req = request, res = response) => {
  var order, orderid
  getOrder = function() {
  console.log('req.body--->'+JSON.stringify(req.body))
  const userId = req.body.user_id;  
  var sucursalid = req.body.direction
 //console.log('sucursalId--->'+sucursalid)
  var promise = new Promise(function(resolve, reject) {  

      // busco la última orden abierta.
      order = Order.findOne({
        where: {
          userId: userId,
          orderStatusId: "0b52bfb5-349e-4b51-95ca-9fb9fbd2dea7"          
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
            price: product.product.price.originalprice,
            orderId: order.id,
          });
        });

      console.log('orderdetail--->'+ JSON.stringify(orderDetail))
        
       //buscar la orden y borrarla para volverla a llenar     

      Orderdetail.destroy({
        where: {
          orderId: order.id   
        }
      })
      
      const newOrderDetail = Orderdetail.bulkCreate(orderDetail);
        orderid = order.id

      } else {
        
        let order = {
          userId: req.body.user_id,
          orderStatusId: "0b52bfb5-349e-4b51-95ca-9fb9fbd2dea7",
          sucursalId: req.body.direction
        }

        const neworder = await Order.create(order);      
        orderid = neworder.id
      
        const orderDetail = req.body.products.map((product) => {
          return (product = {
            productId: product.product.id,
            quantity: product.amount,
            price: product.product.price.originalprice,
            orderId: neworder.id,
          });
        });

        const newOrderDetail = await Orderdetail.bulkCreate(orderDetail);           
  
      }    
      return orderid
  }) 
} 

module.exports = { postOrder };
  

