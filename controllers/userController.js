const User = require('../model/User');

/**
 * @desc Get all users
 * @route GET /api/users
 * @access Public
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * @desc Get a user by ID
 * @route GET /api/users/:id
 * @access Public
 */
exports.getUserById = async (req, res) => {
  try {
    const userId = await User.findById(req.params.userId);

    if (!userId) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found:lll' });
    }

    return res.status(200).json({
      success: true,
      data: userId,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// // create new user

// exports.createUser = async (req, res) => {
//   try {
//     const { name, gender, liveIn, connectionId } = req.body;

//     // Create a new user with the provided connectionId
//     const newUser = new User({
//       name,
//       connectionId,
//       details: { liveIn }, // Include liveIn from req.body
//       preferences: { gender },
//       // ... other properties from req.body
//     });

//     // Save the user to the database
//     const savedUser = await newUser.save();

//     return res.status(201).json({
//       success: true,
//       data: savedUser,
//     });
//   } catch (error) {
//     return res.status(400).json({ success: false, error: error.message });
//   }
// };

// create new user

exports.createUser = async (req, res) => {
  try {
    const { name, connectionId, lookingfor, birthday } = req.body;

    // Create a new user with the provided connectionId
    const newUser = new User({
      name,
      birthday,
      lookingfor,
      connectionId,
      // ... other properties from req.body
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    return res.status(201).json({
      success: true,
      data: savedUser,
    });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// exports.createUser = async (req, res) => {
//   try {
//     const { name, gender, liveIn, connectionId, birthday } = req.body;

//     // Create a new user with the provided connectionId
//     const newUser = new User({
//       name,
//       birthday,
//       connectionId,
//       details: { liveIn }, // Include liveIn from req.body
//       preferences: { gender },
//       // ... other properties from req.body
//     });

//     // Save the user to the database
//     const savedUser = await newUser.save();

//     return res.status(201).json({
//       success: true,
//       data: savedUser,
//     });
//   } catch (error) {
//     return res.status(400).json({ success: false, error: error.message });
//   }
// };

/**
 * @desc Update a user by ID
 * @route PUT /api/users/:id
 * @access Public
 */
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

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
// @route GET /api/users/:connectionId
// @access Public
exports.getUserByConnectionId = async (req, res) => {
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

// @desc Update a user by connection id
// @route PUT /api/users/connectionId
// @access Public
exports.updateUserByConnectionId = async (req, res) => {
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

/**
 * @desc Delete a user by ID
 * @route DELETE api/users/:id
 * @access Public
 */
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      data: deletedUser,
    });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// Add more controller methods with comments based on your needs
