const express = require("express");
const router = express.Router();
const ShopTokenVerify = require("../middleware/ShopOwner");
const controller = require("../Controller/EventController");

router.post(
  "/createEventProduct",
  ShopTokenVerify,
  controller.createEventProducts
);

router.delete(
  "/deleteeventbyOwner/:id",
  ShopTokenVerify,
  controller.deleteEventByOwner
);

router.get("/getOwnerEvents", ShopTokenVerify, controller.ownerEvensts);

router.get("/getAllEvents", controller.ALLEvents);

router.get("/singleEvent/:id", controller.SingleEvent);


module.exports = router;
