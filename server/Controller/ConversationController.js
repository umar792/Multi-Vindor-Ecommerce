const ConversationModel = require("../Model/ConversationSchema");

module.exports = {
  createConversation: async (req, res) => {
    try {
      const { groupTitle, userId, sellerId } = req.body;

      const isConversationExist = await ConversationModel.findOne({
        groupTitle,
      });

      if (isConversationExist) {
        const conversation = isConversationExist;
        res.status(200).json({
          success: true,
          conversation,
        });
      } else {
        const conversation = await ConversationModel.create({
          member: [userId, sellerId],
          groupTitle,
        });

        res.status(200).json({
          success: true,
          conversation,
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};
