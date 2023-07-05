const express = require("express");
const router = express.Router();
const TokenVerfy = require("../middleware/VerifyToken");
const controller = require("../Controller/OrderController");

router.post("/createOrder", TokenVerfy, controller.createOrder);

module.exports = router;
