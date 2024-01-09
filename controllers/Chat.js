const Message = require('../model/Chat');

// @desc    Controller to create a new message
// @route   POST /api/messages
// @access  Public

exports.createMessage = async (req, res) => {
  try {
    const { conversationId, sender, text } = req.body;

    // Create a new message
    const newMessage = new Message({
      conversationId,
      sender,
      text,
    });

    // Save the message to MongoDB
    await newMessage.save();

    return res
      .status(201)
      .json({ message: 'Message created successfully', data: newMessage });
  } catch (error) {
    console.error('Error creating message:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// @desc   Controller to get all messages for a specific conversation
// @route   GET /api/messages/:conversationId
// @access  Public

exports.getMessagesByConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;

    // Find all messages for the given conversationId
    const messages = await Message.find({ conversationId });

    return res.status(200).json({ data: messages });
  } catch (error) {
    console.error('Error fetching messages:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
