const express = require("express");
const router = express.Router();
const { upload } = require("../multer/multer");
const controller = require("../Controller/UserController");
const TokenVerfy = require("../middleware/VerifyToken");

router.post("/registration", upload.single("file"), controller.createUser);

router.post("/activationAccount", controller.activeUser);

router.post("/login", controller.LoginUser);

router.get("/loaduser", TokenVerfy, controller.LoadUser);

module.exports = router;
