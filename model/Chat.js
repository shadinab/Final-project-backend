// models/Chat.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  room: String,
  author: String,
  message: String,
  time: String,
});

messageSchema.statics.getChatHistory = async function (room) {
  try {
    const history = await this.find({ room }).sort({ _id: 1 });
    return history;
  } catch (error) {
    throw new Error(`Error fetching chat history: ${error.message}`);
  }
};

module.exports = mongoose.model('Message', messageSchema);
