const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = {
  CreditCardPayment: async (req, res) => {
    try {
      const myPayment = stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "PKR",
        metadata: {
          company: "YOUR-SHOP",
        },
      });
      res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};
