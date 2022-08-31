const { Op } = require("sequelize");
const { Order, Orderdetail } = require("../db");
const { request, response } = require("express"); 

const postOrder = async (req = request, res = response) => {  

  //console.log('--->>>'+JSON.stringify(req.body.user_id))
let order = {
    userId: req.body.user_id
    //userId: "df2468c1-3695-3e2c-b9a3-d8d64db911e2"
};

  try {
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
  }
   catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = { postOrder };
