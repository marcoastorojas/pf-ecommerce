const { Op } = require("sequelize");
const { Order, Orderdetail } = require("../db");
const { request, response } = require("express"); 

const postOrder = async (req = request, res = response) => {  

let order = {
    userId: userId,
};

  try {
    const newOrder = await Order.create(order);
    const orderDetail = req.body.products.map((product) => {
      return (product = {
        id_product: product.product.id,
        quantity: product.amount,
        price: product.product.price,
        orderId: newOrder.id,
      });
    });
    
    const newOrderDetail = await Orderdetail.bulkCreate(orderDetail);    
   
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = { postOrder };
