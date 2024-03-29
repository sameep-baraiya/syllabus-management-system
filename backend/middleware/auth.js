const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../models/User');

// Protect routes
exports.protect = (roleArr = ['admin']) => async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Set token from Bearer token in header
      token = req.headers.authorization.split(' ')[1];
      // Set token from cooki
    }

    // Make sure token exists
    if (!token) {
      return next(
        new ErrorResponse('Not authorized to access this route', 401)
      );
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      decoded.id;
      if (!decoded.id) {
        return next(
          new ErrorResponse('Not authorized to access this route', 401)
        );
      }
      const user = await User.findByPk(decoded.id, {
        attributes: ['id', 'name', 'role'],
      });
      if (user === null) {
        return next(
          new ErrorResponse('Not authorized to access this route', 401)
        );
      }
      if (!roleArr.includes(user.role)) {
        return next(
          new ErrorResponse('Not authorized to access this route', 401)
        );
      }
      req.user = user;
      next();
    } catch (err) {
      return next(
        new ErrorResponse('Not authorized to access this route', 401)
      );
    }
  } catch (err) {
    console.error(err);
  }
};
