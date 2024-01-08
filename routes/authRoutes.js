const express = require('express');
const {
  register,
  login,
  logout,
  getCurrentUser,
  AuthUpdateByConnectionId,
  getAuthUserByConnectionId,
} = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


/**
 * @desc update based in connection id
 * @route put/api/auth/:connectionId
 * @access Public
 */

router.put('/:connectionId', AuthUpdateByConnectionId);
router.get('/:connectionId', getAuthUserByConnectionId);

getAuthUserByConnectionId;
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/current-user', authMiddleware,getCurrentUser);

module.exports = router;
