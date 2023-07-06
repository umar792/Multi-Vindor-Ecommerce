const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  shippingInfo: {
    Adress: {
      type: String,
      required: [true, "Please Enter Your Adress"],
    },
    city: {
      type: String,
      required: [true, "Plaese Enter Your City Name"],
    },
    country: {
      type: String,
      required: [true, "Plaese Enter Your Country Name"],
    },
    number: {
      type: Number,
      required: [true, "Please Enter Your Mobile Number"],
    },
    name: {
      type: String,
      required: [true, "Plaese Enter Your Name"],
    },
    email: {
      type: String,
      required: [true, "Plaese Enter Your Name"],
    },
  },

  orderItem: {
    type: Array,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },

  paymentStatus: {
    type: String,
    default: "Not Paid",
  },
  paymentmethod: {
    type: String,
    default: "cash on delivery",
  },
  paidAt: {
    type: Date,
    required: true,
  },
  //   itemsPrice: {
  //     type: Number,
  //     required: true,
  //     default: 0,
  //   },

  shippingPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  // cardQuantity: [{ type: Schema.Types.Mixed, required: true }],
});

const OrderModel = mongoose.model("order", OrderSchema);
module.exports = OrderModel;
