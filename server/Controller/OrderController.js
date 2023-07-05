const OrderModel = require("../Model/OrderModel");

module.exports = {
  createOrder: async (req, res) => {
    try {
      const { shippingInfo, orderItem, itemsPrice, shippingPrice, totalPrice } =
        req.body;

      if (!shippingInfo) {
        return res.status(400).json({
          success: false,
          message: "Please enter Shipping Info",
        });
      }

      if (!orderItem) {
        return res.status(400).json({
          success: false,
          message: "Please enter Order Item",
        });
      }

      //   if (!itemsPrice) {
      //     return res.status(400).json({
      //       success: false,
      //       message: "Please enter Items Price",
      //     });
      //   }

      if (!shippingPrice) {
        return res.status(400).json({
          success: false,
          message: "Please enter Shipping Price",
        });
      }

      if (!totalPrice) {
        return res.status(400).json({
          success: false,
          message: "Please enter Total Price",
        });
      }

      const order = await OrderModel.create({
        shippingPrice,
        shippingInfo,
        orderItem,
        totalPrice,
        itemsPrice,
        user: req.user._id,
        paidAt: Date.now(),
      });
      res.status(200).json({
        success: true,
        message: "Your Order Place Successfuly",
        order,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};
