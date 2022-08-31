class PaymentController {
  constructor(subscriptionService) {
    this.subscriptionService = subscriptionService;
  }

  async getPaymentLink(req, res) {
    try {
      const payment = await this.subscriptionService.createPayment(req);
      return payment.data.init_point
      //res.status(200).send(payment.data.init_point);
    } catch (error) {
      return res.status(500).json({ error: true, msg: "failed to create payment." });
    }
  }
}

module.exports = PaymentController;
