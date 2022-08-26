const { Op } = require("sequelize")
const { Order, OrderDetail } = require("../db")
const { request, response } = require('express');

const postOrder = async (req = request, res = response) => {
  const { order, orderDetail } = req.body;

  try {
    if (order && orderDetail) {
      const newOrder = await Order.create(order);
      orderDetail.map((product) => (product.orderId = newOrder.id));
      const newOrderDetail = await OrderDetail.bulkCreate(orderDetail);
      res.status(200).json([newOrder, newOrderDetail]);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = { postOrder }

  
