const express = require("express");
const ShopTokenVerify = require("../middleware/ShopOwner");
const router = express.Router();
const controller = require("../Controller/ProductController");

router.post("/createProduct", ShopTokenVerify, controller.createProducts);

module.exports = router;
