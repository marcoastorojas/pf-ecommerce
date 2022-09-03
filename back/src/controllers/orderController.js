const { Op } = require("sequelize")

const { Order, Orderdetail, Product, User }  = require("../db")
const { createWhereAndOrder } = require("../helpers/createWhereOrder")

const { request, response } = require('express');

const getOrderbyUser = async (req = request, res = response) => {
  const userId = req.body.userId  
  console.log(userId)
  let where = {}
  if (!!userId) {
    where = {userId: userId}
  }
    const order = Order.findAll({
      include: [{ model: Orderdetail, include: [Product] }, {model: User}],
      where: where
    })
 
  order.then((order)=>{
    res.json(order)
    // console.log(order)
  })
};
 
module.exports = {   
  getOrderbyUser   
}
