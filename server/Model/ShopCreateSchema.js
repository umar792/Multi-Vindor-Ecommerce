const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const ShopCreateschema = new Schema({
  shopName: {
    type: String,
    required: [true, "Plaese Enter Your Shop Name"],
  },
  number: {
    type: Number,
    minLength: [11, "Please Enter Your Mobile Number Without Zero (0)"],
  },
  email: {
    type: String,
    required: [true, "Plaese Enter Your Email Adress"],
    unique: true,
    validate: [validator.isEmail, "Plaese Enter Valid Email Adress"],
  },
  Adress: {
    type: String,
    required: [true, "Please Enter Your Shop Adress"],
  },
  zipcode: {
    type: Number,
    required: [true, "Plaese Enter Your City ZipCode"],
  },
  password: {
    type: String,
    required: [true, "Plaese Enter Your Password"],
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  products: [
    {
      type: mongoose.Types.ObjectId,
      ref: "product",
    },
  ],
  events: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Event",
    },
  ],
  shopDescription: {
    type: String,
    required: [true, "Plaese Enter Your Shop Short Description"],
  },
  OTP: {
    type: Number,
  },
  OTP_Expire: {
    type: Date,
  },
  verify: {
    type: Boolean,
    default: false,
  },
});

ShopCreateschema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hashSync(this.password, 10);
  }
});

ShopCreateschema.index({ OTP_Expire: 1 }, { expireAfterSeconds: 0 });

const ShopModal = mongoose.model("shop", ShopCreateschema);
module.exports = ShopModal;
