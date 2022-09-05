const { Op } = require("sequelize");
const { Order, Orderdetail } = require("../db");
const { request, response } = require("express"); 

const postOrder = async (req = request, res = response) => {  

  
let order = {
    userId: req.body.user_id,
    orderStatusId: '364b4a01-f721-4b01-9189-d0d54f0011c8',
    email: req.body.email,
    direction: req.body.direction,
    sucursalId: req.body.sucursalId,
};

  //try {
    const newOrder = await Order.create(order);
    const orderDetail = req.body.products.map((product) => {
      return (product = {        
        productId: product.product.id,
        quantity: product.amount,
        price: product.product.price,
        orderId: newOrder.id,
      });
    });
    
    const newOrderDetail = await Orderdetail.bulkCreate(orderDetail);    
    return newOrder.id
 // }
 // catch (error) {
    res.status(500).json({ error: error });
 // }
};

module.exports = { postOrder };
