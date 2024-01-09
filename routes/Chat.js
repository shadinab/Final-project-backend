const express = require('express');
const router = express.Router();
const messageController = require('../controllers/Chat');

// Route to create a new message
router.post('/messages', messageController.createMessage);

// Route to get messages for a specific conversation
router.get(
  '/messages/:conversationId',
  messageController.getMessagesByConversation
);

module.exports = router;
