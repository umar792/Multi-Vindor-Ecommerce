const express = require("express");
const router = express.Router();
const ShopTokenVerify = require("../middleware/ShopOwner");
const controller = require("../Controller/EventController");

router.post(
  "/createEventProduct",
  ShopTokenVerify,
  controller.createEventProducts
);

module.exports = router;
