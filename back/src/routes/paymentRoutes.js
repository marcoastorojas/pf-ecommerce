const { Router } = require("express")
const paymentRoutes = Router();

const PaymentController = require("../controllers/paymentController")
const PaymentService = require("../Services/PaymentService") 
const PaymentInstance = new PaymentController(new PaymentService())

const { Order, Orderdetail, Product, User } = require("../db")
//controllers
const { postOrder } = require("../controllers/paymentModelController")

paymentRoutes.post("/", function (req, res, next) {
  //Persiste el pedido en la b.d. y devuelve el link de pago.
  let arr = [];
  const idOrder = postOrder(req, res).then((idOrder) => {    
    const order = Order.findByPk(idOrder, {
      include: [{ model: Orderdetail, include: [Product] }],
    })
    .then((order) => {
      const userName = User.findOne({ where: { uid: order.userId } });
      userName.then((username) => {
        const filteredOrder = {
          orderId: order.id,
          orderUser: {
            idUser: order.userId,
            userName: username,
          },
          orderDetail: order.orderdetails.map((product) => {
            return {
              idProduct: product.productId,
              title: product.product.title,
              quantity: product.quantity,
              price: product.product.price,
            };
          }),
        };

        link = PaymentInstance.getPaymentLink(req, res).then((link) =>{
          console.log([{ link: link, order: JSON.stringify(filteredOrder) }])
          res.status(200).send([{ link: link, order: JSON.stringify(filteredOrder) }])          
        });
      });
    });
  });
});

module.exports = {
  paymentRoutes,
};
