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

  // -------------------------- get user Order
  getUserOrder: async (req, res) => {
    try {
      const userOrder = await OrderModel.find({ user: req.user._id })
        .populate("orderItem")
        .populate("user");
      res.status(200).json({
        success: true,
        userOrder,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // ----------------------- get single order
  getSingleUserOrder: async (req, res) => {
    try {
      const order = await OrderModel.findById(req.params.id)
        .populate("orderItem.product")
        .populate("user");
      if (!order) {
        return res.status(400).json({
          success: false,
          message: "No Order Found",
        });
      }

      res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // ----------------- get shop order
  ownerOrder: async (req, res) => {
    try {
      const ownerId = req.user._id; // Get the authenticated user's ID
      const orders = await OrderModel.find();
      res.status(200).json({
        success: true,
        orders: orders.orderItem,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};
