const { Op } = require("sequelize");
const { Order, Orderdetail } = require("../db");
const { request, response } = require("express");


const postOrder = async (req = request, res = response) => {
  var order, orderid
  getOrder = function () {

    const userId = req.body.user_id;
    var sucursalid = req.body.direction

    var promise = new Promise(function (resolve, reject) {

      // busco la última orden abierta.
      order = Order.findOne({
        where: {
          userId: userId,
          orderStatusId: "433bf4b3-a8bd-4f40-9cb1-bffab0a44c80"
        },
      })
      resolve(order);
    });

    return promise;
  };

  return getOrder().then(async function (order) {

    if (order !== null) {
      const orderDetail = req.body.products.map((product) => {
        return (product = {
          productId: product.product.id,
          quantity: product.amount,
          price: product.product.price.originalprice,
          orderId: order.id,
        });
      });


      //buscar la orden y borrarla para volverla a llenar     

      const deleteRows = await Orderdetail.destroy({
        where: {
          orderId: order.id
        }
      })

      const newOrderDetail = Orderdetail.bulkCreate(orderDetail);
      orderid = order.id

    } else {

      let order = {
        userId: req.body.user_id,
        orderStatusId: "433bf4b3-a8bd-4f40-9cb1-bffab0a44c80",
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


      console.log('orderDetail--->' + orderDetail)

      const newOrderDetail = await Orderdetail.bulkCreate(orderDetail);

    }
    return orderid
  })
}

module.exports = { postOrder };


