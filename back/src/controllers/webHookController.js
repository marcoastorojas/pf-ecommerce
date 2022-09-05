const { request, response } = require('express');

//const { Op } = require("sequelize");
const { Order } = require("../db");

const recibeConfirmation = async (req = request, res = response) => {
  const confirmation = req.body
     
  //res.status(200).send(confirmation)
  //console.log(confirmation)  

  //cambiar status de pedido a pagado   

 Order.findOne({ order: [['id', 'DESC']]}) 
.then((order)=> {
  console.log(order.id)
  updatedRows = Order.update(
    {orderStatusId: "364b4a01-f721-4b01-9189-d0d54f0011c8"},
    {where: { id: order.id }}
    ) 
    updatedRows.then(()=>console.log(updatedRows))
})
  
  



}

module.exports = {   
  recibeConfirmation   
}