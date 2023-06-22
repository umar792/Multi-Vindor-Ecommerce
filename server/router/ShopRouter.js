const express = require("express");
const router = express.Router();
const controller = require("../Controller/ShopController");
const ShopTokenVerify = require("../middleware/ShopOwner");

router.post("/createShop", controller.createShop);

router.post("/verifyOTP", controller.verifyOTP);

router.post("/logintoshop", controller.LoginShop);

router.get("/ShowOwner", ShopTokenVerify, controller.getShopOwner);

router.get("/singleowner/:id", controller.getSingleOwner);

module.exports = router;
