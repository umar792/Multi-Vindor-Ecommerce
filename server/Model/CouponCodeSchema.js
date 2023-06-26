const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CoupenCodeSchema = new Schema({
  name: {
    type: String,
    required: [true, "Plaese enter a coupon code name"],
    unique: [true, "A coupon code of this name is alredy present"],
  },
  value: {
    type: Number,
    required: true,
  },
  minAmount: {
    type: Number,
  },
  shop: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  Coupon_Expire: {
    type: [Number, "Plaese enter days like 10 , 20 ,30"],
    required: [true, "Plaese enter days on coupon code"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const CouponModel = mongoose.model("coupon", CoupenCodeSchema);
module.exports = CouponModel;
