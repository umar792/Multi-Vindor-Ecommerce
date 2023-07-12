const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  conversationId: {
    type: String,
  },
  sender: {
    type: String,
  },
  images: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
});

const MessageModel = mongoose.model("message", MessageSchema);
module.exports = MessageModel;
