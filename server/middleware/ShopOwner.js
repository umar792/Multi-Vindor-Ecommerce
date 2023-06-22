const jwt = require("jsonwebtoken");
const ShopModal = require("../Model/ShopCreateSchema");

const ShopTokenVerify = async (req, res, next) => {
  try {
    const token = req.headers["token"];
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token Expire Plaese Login",
      });
    }

    const decoded = await jwt.verify(token, process.env.jwt_shop);
    req.user = await ShopModal.findById(decoded._id);
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = ShopTokenVerify;
