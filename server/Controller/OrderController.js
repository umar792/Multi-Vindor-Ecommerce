const OrderModel = require("../Model/OrderModel");
const ProductModel = require("../Model/ProductSchema");
const UserModel = require("../Model/UserSchema");
const EventModel = require("../Model/EventsSchema");

module.exports = {
  createOrder: async (req, res) => {
    try {
      // --------------------------------------------
      const { cart, shippingAddress, totalPrice, paymentInfo } = req.body;

      //   group cart items by shopId
      const shopItemsMap = new Map();

      for (const item of cart) {
        const shopId = item.owner._id;
        if (!shopItemsMap.has(shopId)) {
          shopItemsMap.set(shopId, []);
        }
        shopItemsMap.get(shopId).push(item);
      }

      // create an order for each shop
      const orders = [];

      for (const [shopId, items] of shopItemsMap) {
        const order = await OrderModel.create({
          cart: items,
          shippingAddress,
          user: req.user._id,
          totalPrice,
          paymentInfo,
        });
        orders.push(order);
      }

      res.status(201).json({
        success: true,
        orders,
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
      const userOrder = await OrderModel.find({ user: req.user._id }).populate(
        "user"
      );
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
      const order = await OrderModel.findById(req.params.id).populate("user");
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
      const filteredData = [];

      orders &&
        orders.forEach((item) => {
          item.cart.forEach((i) => {
            if (i.owner._id.toString() === ownerId.toString()) {
              filteredData.push(item);
            }
          });
        });

      res.status(200).json({
        success: true,
        data: filteredData,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // ----------------------- update order status
  changeOrderStatus: async (req, res) => {
    try {
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({
          success: false,
          message: "Plaese enter status",
        });
      }

      const order = await OrderModel.findById(req.params.id);
      const event = await EventModel.findById(req.params.id);
      // if (!order) {
      //   res.status(400).json({
      //     success: false,
      //     message: "No Order Found",
      //   });
      // }

      if (order.Orderstatus === "Delivered") {
        return res.status(400).json({
          success: false,
          message: "You have already delivered this order",
        });
      }

      if (order.Orderstatus === "Shipped") {
        order.paymentstatus = "Paid";
        await order.save();
        order.cart.forEach(async (o) => {
          await updateStock(o._id, o.quantity);
        });
      }
      if (order.Orderstatus === "Shipped") {
        order.paymentstatus = "Paid";
        await order.save();
        order.cart.forEach(async (o) => {
          await updateStockEvent(o._id, o.quantity);
        });
      }
      order.Orderstatus = status;
      await order.save();
      res.status(200).json({
        success: true,
        message: "Order Status Update Successfuly",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    // -------------------------
    async function updateStock(id, quantity) {
      const product = await ProductModel.findById(id);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "product not found",
        });
      }

      product.stock = product.stock - quantity;
      product.sold_out = product.sold_out + quantity;
      await product.save();
    }
    // -------------------------updateStockEvent
    async function updateStockEvent(id, quantity) {
      const product = await EventModel.findById(id);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "product not found",
        });
      }

      product.stock = product.stock - quantity;
      product.sold_out = product.sold_out + quantity;
      await product.save();
    }
  },
};
