const express = require("express");
const ShopTokenVerify = require("../middleware/ShopOwner");
const TokenVerfy = require("../middleware/VerifyToken");
const router = express.Router();
const controller = require("../Controller/ProductController");

router.post("/createProduct", ShopTokenVerify, controller.createProducts);

router.get("/getOwnerProducts", ShopTokenVerify, controller.ownerProducts);

router.get("/allProducts", controller.AllProducts);

router.get("/singleProduct/:id", controller.SingleProduct);

router.delete(
  "/deleteproductbyOwner/:id",
  ShopTokenVerify,
  controller.deleteProductByOwner
);

router.put("/addreview", TokenVerfy, controller.createReview);

module.exports = router;
