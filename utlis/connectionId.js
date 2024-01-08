const { v4: uuidv4 } = require('uuid');

function generateRandomConnectionId() {
  return uuidv4();
}

module.exports = generateRandomConnectionId;
