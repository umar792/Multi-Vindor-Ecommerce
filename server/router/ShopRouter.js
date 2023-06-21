const express = require("express");
const router = express.Router();
const controller = require("../Controller/ShopController");

router.post("/createShop", controller.createShop);

router.post("/verifyOTP", controller.verifyOTP);

router.post("/logintoshop", controller.LoginShop);

module.exports = router;
