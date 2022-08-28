class PaymentController {
  constructor(subscriptionService) {
    this.subscriptionService = subscriptionService;
  }

async getPaymentLink(req, res){
    try {      
        const payment = await this.subscriptionService.createPayment(req);   
        res.json(payment.data.init_point)                       
    } catch (error){
      console.log(error);
      return res
      .status(500)
      .json({error: true, msg: "failed to create payment."})
    }
  }
}

module.exports = PaymentController;