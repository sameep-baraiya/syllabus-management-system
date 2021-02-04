const { validationResult } = require('express-validator');
const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../models/User');

// @desc    Get logged in user
// @route   Get /api/v1/auth/
// @access  Private
exports.getLoggedInUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const result = user.toJSON();
    delete result.password;
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new ErrorResponse(
        'Registration validation error',
        400,
        'express-validator',
        errors.array()
      )
    );
  }
  const {
    firstName,
    lastName,
    middleName,
    email,
    contactNumber,
    role,
    department,
    password,
  } = req.body;
  try {
    const user = await User.create({
      name: `${firstName}-${middleName}-${lastName}`,
      email,
      contactNumber,
      role,
      department,
      password,
    });

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    return next(err);
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new ErrorResponse(
        'Login validation error',
        400,
        'express-validator',
        errors.array()
      )
    );
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user == null) {
      return next(
        new ErrorResponse('User does not exist', 400, 'field-not-found')
      );
    } else {
      if (user.matchPassword(password)) {
        if (user.isApproved) {
          sendTokenResponse(user, 200, res);
          next();
        } else {
          return next(
            new ErrorResponse(
              'Account Requset not approved yet',
              403,
              'access-forbidden'
            )
          );
        }
      } else {
        return next(
          new ErrorResponse(
            'Email and password did not mached',
            401,
            'unauthorized'
          )
        );
      }
    }
  } catch (err) {
    return next(err);
  }
};

// Get token from model and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  res.status(statusCode).json({
    success: true,
    token,
  });
};
