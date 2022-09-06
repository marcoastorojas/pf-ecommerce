const { request, response } = require('express');
const sendmail = require("../helpers/sendEmail")

const { User, Order, Orderdetail, Product } = require("../db");


const recibeConfirmation = async (req = request, res = response) => {
  const confirmation = req.body;
  var email;

  //cambiar status de pedido a pagado y enviar email.

  Order.findOne({ order: [["id", "DESC"]] }).then((order) => {
    updatedRows = Order.update(
      { orderStatusId: "0b52bfb5-349e-4b52-95ca-9fb9fbd2dea7" },
      { where: { id: order.id } }
    );
    updatedRows.then(() => console.log(updatedRows));

    const orderdetail = Orderdetail.findAll({
      include: Product,
      where: { orderId: order.id },
    });

    orderdetail.then((orderdetail) => {
      let html = orderdetail.map((product) => {
        return (
          "<div>" +
          "<p>" +
          "Product: " +
          product.product.title +
          "</p>" +
          "<p>" +
          "Quantity: " +
          product.quantity +
          "</p>" +
          "<p>" +
          "Price: " +
          product.price +
          "</p>" +
          "</div>"
        );
      });
      html =
        "<img src='https://noraraimondo.com/wp-content/uploads/Logo-Mercadopago-333-150x150.jpg'>" +
        "<h1>Your order: </h1>" +
        html +
        "<p>State :" +
        "<bold>PAYED</bold>";   
 
      const user = User.findByPk(order.userId)
  
      user.then((user)=>{
        email = user.email  

        sendmail(        
          email,
          "Order resume",
          "Order resume",
          html.toString()
        );
      })
    });
  });
}; 

module.exports = {   
  recibeConfirmation   
}