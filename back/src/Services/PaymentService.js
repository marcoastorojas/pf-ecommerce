const axios = require("axios");

class PaymentService {
    async createPayment() {
        const url = "https://api.mercadopago.com/checkout/preferences";

        const body = {
            payer_email: "test_user46945293@testuser.com",
            "items": [
                {
                  "title": "Dummy Title",
                  "description": "Dummy description",
                  "picture_url": "http://www.myapp.com/myimage.jpg",
                  "category_id": "car_electronics",
                  "quantity": 1,
                  "currency_id": "ARS",
                  "unit_price": 10
                }
              ],
              "payer": {
                "phone": {},
                "identification": {},
                "address": {}
              },
              "payment_methods": {
                "excluded_payment_methods": [
                  {}
                ],
                "excluded_payment_types": [
                  {}
                ]
              },
              "shipments": {
                "free_methods": [
                  {}
                ],
                "receiver_address": {}
              },
              "back_urls": {},
              "differential_pricing": {},
              "metadata": {}             
        };

        const payment = await axios.post(url, body, {
            headers: {
                "Content-Type": "applitacion/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        });

        return payment;
    }
}

module.exports = PaymentService
    
    