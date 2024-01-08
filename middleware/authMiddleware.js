const jwt = require('jsonwebtoken');
const User = require('../model/auth');
const ErrorResponse = require('../utlis/errorResponse');

const authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
};

module.exports = authMiddleware;

// const authMiddleware = async (req, res, next) => {
//   try {
//     const token =
//       req.headers.authorization && req.headers.authorization.split(' ')[1];

//     if (!token) {
//       return res
//         .status(401)
//         .json({ success: false, message: 'Unauthorized: No token provided' });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findById(decoded.id);

//     if (!user) {
//       return res
//         .status(401)
//         .json({ success: false, message: 'Unauthorized: User not found' });
//     }

//     console.log('User attached to request:', user);

//     req.user = user;

//     next();
//   } catch (error) {
//     return res
//       .status(401)
//       .json({ success: false, message: 'Unauthorized: Invalid token' });
//   }
// };

// module.exports = authMiddleware;
