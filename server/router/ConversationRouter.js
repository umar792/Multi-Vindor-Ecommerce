const express = require("express");
const router = express.Router();
const controller = require("../Controller/ConversationController");

router.post("/createConversationgroup", controller.createConversation);

module.exports = router;
