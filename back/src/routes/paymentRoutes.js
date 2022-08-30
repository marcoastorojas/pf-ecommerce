const { Router } = require("express")
const paymentRoutes = Router();

const PaymentController = require("../controllers/paymentController")
const PaymentService = require("../Services/PaymentService") 
const PaymentInstance = new PaymentController(new PaymentService())

const { Order, Orderdetail, Product, User } = require("../db")
//controllers
const { postOrder } = require("../controllers/paymentModelController")

paymentRoutes.post("/", function (req, res, next) {
  let arr = [];
  const idOrder = postOrder(req, res).then((idorder) => {
    const order = Order.findByPk(idorder, {
      include: [{ model: Orderdetail, include: [Product] }],
    })
    .then((order) => {
      const user = User.findOne({ where: { uid: order.userId } });

      user.then((user) => {
        const filteredOrder = {
          orderId: order.id,
          user: {
            id: user.uid,
            userName: user.username,
            email: user.email,
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
        //console.log(filteredOrder);
        link = PaymentInstance.getPaymentLink(req, res)
        .then((link) =>{
          //console.log(link)
          console.log([{ link: link, order: JSON.stringify(filteredOrder) }])
          res.status(200).send([{ link: link, order: JSON.stringify(filteredOrder) }])
        })
      });
    });
  });
});

module.exports = {
  paymentRoutes,
};
 