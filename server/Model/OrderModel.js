const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  cart: {
    type: Array,
    required: true,
  },
  shippingAddress: {
    type: Object,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  Orderstatus: {
    type: String,
    default: "Processing",
  },
  paymentstatus: {
    type: String,
    default: "Cash On Delivery",
  },
  // paymentInfo:{
  //     id:{
  //         type: String,
  //     },
  //     status: {
  //         type: String,
  //     },
  //     type:{
  //         type: String,
  //     },
  // },
  paidAt: {
    type: Date,
    default: Date.now(),
  },
  deliveredAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const OrderModel = mongoose.model("order", OrderSchema);
module.exports = OrderModel;
