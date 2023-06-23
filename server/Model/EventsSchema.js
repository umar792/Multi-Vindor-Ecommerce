const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter your event product name"],
  },
  description: {
    type: String,
    required: [true, "Please enter your event product description"],
  },
  category: {
    type: String,
    required: [true, "Please enter your event product category"],
  },
  Tags: {
    type: String,
    required: [true, "Please enter your event product Tags"],
  },
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
    required: [true, "Please Enter Your event Product Discount Price"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter Your event Product Stock"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "shop",
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDate: {
    type: Date,
    required: [true, "Plaese Enter Start Event Date"],
  },
  endDate: {
    type: Date,
    required: [true, "Plaese Enter End Event Date"],
  },
});

const EventModel = mongoose.model("Event", EventSchema);
module.exports = EventModel;
