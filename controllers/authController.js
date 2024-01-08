const LoginUser = require ('../model/auth');
const generateRandomConnectionId = require('../utlis/connectionId');
const jwt = require('jsonwebtoken');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Generate a common connectionId
    const connectionId = generateRandomConnectionId();

    // Create LoginUser
    const newUser = await LoginUser.create({
      name,
      email,
      password,
      connectionId,
    });

    // Generate token
    const token = newUser.getSignedJwtToken();
    res.status(201).json({
      success: true,
      token,
      connectionId,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// @desc Update a user by connection id
// @route PUT /api/auth/connectionId
// @access Public
exports.AuthUpdateByConnectionId = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { connectionId: req.params.connectionId },
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};


// @desc Get a user by connection id
// @route GET /api/auth/:connectionId
// @access Public
exports.getAuthUserByConnectionId = async (req, res) => {
  try {
    const user = await User.findOne({ connectionId: req.params.connectionId });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Login LoginUser
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request data (add more validation as needed)

    // Check if LoginUser exists
    const loginUser = await LoginUser.findOne({ email });

    if (!loginUser) {
      return res
        .status(401)
        .json({ success: false, error: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await loginUser.matchPassword(password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, error: 'Invalid credentials' });
    }

    // Generate token
    const token = loginUser.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token,
      connectionId: loginUser.connectionId,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};






// @desc    Log user out / clear cookie
// @route   GET /api/auth/logout
// @access  Private
exports.logout = async (req, res) => {
  try {
    // Clear cookie
    res.clearCookie('token');

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const User = require('../model/auth');

// @desc    Get current logged in user
// @route   POST /api/auth/current-user
// @access  Private

exports.getCurrentUser = (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user, // user is attached by the auth middleware
  });
};