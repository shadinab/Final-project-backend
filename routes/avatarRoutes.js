const express = require('express');
const router = express.Router();
const avatarController = require('../controllers/avatarController');

// Define route to get avatars
router.get('/avatars', avatarController.getAvatars);

module.exports = router;
