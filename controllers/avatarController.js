const User = require('../model/User');

// @desc    get the users avatars pic
// @route   get /avatars
// @access  Public

exports.getAvatars = async (req, res) => {
  try {
    const userData = await User.find({}, 'avatar');
    const avatarUrls = userData.map((user) => user.avatar);

    res.json(avatarUrls);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
