const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ConversationSchema = new Schema(
  {
    groupTitle: {
      type: String,
    },
    member: {
      type: Array,
    },
    lastMessage: {
      type: String,
    },
    lastMessageId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ConversationModel = mongoose.model("conversation", ConversationSchema);
module.exports = ConversationModel;
