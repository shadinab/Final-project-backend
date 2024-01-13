// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const Message = require('../model/Chat');

router.get('/chat/history/:room', async (req, res) => {
  const room = req.params.room;

  try {
    const history = await Message.getChatHistory(room);
    res.json({ messages: history });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
