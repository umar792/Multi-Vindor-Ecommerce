const express = require("express");
const router = express.Router();
const controller = require("../Controller/PaymentStripeController");

router.post("/payment/process", controller.CreditCardPayment);

module.exports = router;
