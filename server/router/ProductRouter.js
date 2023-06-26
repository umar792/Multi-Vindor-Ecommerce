const express = require("express");
const ShopTokenVerify = require("../middleware/ShopOwner");
const router = express.Router();
const controller = require("../Controller/ProductController");

router.post("/createProduct", ShopTokenVerify, controller.createProducts);

router.get("/getOwnerProducts", ShopTokenVerify, controller.ownerProducts);

router.get("/allProducts", controller.AllProducts);

router.delete(
  "/deleteproductbyOwner/:id",
  ShopTokenVerify,
  controller.deleteProductByOwner
);

module.exports = router;
