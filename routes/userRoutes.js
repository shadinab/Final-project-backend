const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @desc Get a Single connection id
 * @route get /users/:connectionId
 * @access Public
 */

router.get('/users/:connectionId', userController.getUserByConnectionId);

/**

/**
 * @desc update based in connection id
 * @route put /users/:connectionId
 * @access Public
 */

router.put('/users/:connectionId', userController.updateUserByConnectionId);

/**
 * @desc Get all users
 * @route GET /users
 * @access Public
 */
router.get('/users/', userController.getAllUsers);

/**
 * @desc Get a user by ID
 * @route GET /users/:id
 * @access Public
 */
router.get('/usersById/:userId', userController.getUserById);

/**
 * @desc Create a new user
 * @route POST /users
 * @access Public
 */
router.post('/users/', userController.createUser);

/**
 * @desc Update a user by ID
 * @route PUT /users/:id
 * @access Public
 */
router.put('/users/:id', userController.updateUser);

/**
 * @desc Delete a user by ID
 * @route DELETE /users/:id
 * @access Public
 */
router.delete('/users/:id', userController.deleteUser);

/**
 * @desc Welcome route
 * @route GET /
 * @access Public
 */
router.get('/', (req, res) => {
  res.send('Welcome to the dating app!');
});

module.exports = router;
