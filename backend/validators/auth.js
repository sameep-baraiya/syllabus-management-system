const { body } = require('express-validator');

exports.registerVal = [
  body('firstName').not().isEmpty().withMessage('firstName is required'),
  body('firstName')
    .isLength({ min: 1, max: 16 })
    .withMessage('firstName must be 1-16 characters in length')
    .matches(/^[a-z]+$/)
    .withMessage('firstName must be alphabetic'),

  body('lastName').not().isEmpty().withMessage('lastName is required'),
  body('lastName')
    .isLength({ min: 1, max: 16 })
    .withMessage('lastName must be 1-16 characters in length')
    .matches(/^[a-z]+$/)
    .withMessage('lastName must be alphabetic'),

  body('middleName').not().isEmpty().withMessage('middleName is required'),
  body('middleName')
    .isLength({ min: 1, max: 16 })
    .withMessage('middleName must be 1-16 characters in length')
    .matches(/^[a-z]+$/)
    .withMessage('middleName must be alphabetic'),

  body('email').not().isEmpty().withMessage('email is required'),
  body('email').isEmail().withMessage('email must be valid'),

  body('contactNumber')
    .not()
    .isEmpty()
    .withMessage('contactNumber is required'),
  body('contactNumber')
    .isLength({ min: 10, max: 10 })
    .withMessage('contactNumbe must be 10 characters long'),
  body('contactNumber').isInt().withMessage('contactNumber must be valid'),

  body('role').not().isEmpty().withMessage('role is required'),

  body('department').not().isEmpty().withMessage('department is required'),

  body('password').not().isEmpty().withMessage('password is required'),
  body('password')
    .isLength({ min: 6, max: 16 })
    .withMessage('password must be 6-16 characters in length')
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .withMessage(
      'password must be alphanumeric, contain special character(!@#$%^&*)'
    ),
];

exports.loginVal = [
  body('email').not().isEmpty().withMessage('email is required'),
  body('email').isEmail().withMessage('email must be valid'),

  body('password').not().isEmpty().withMessage('password is required'),
  body('password')
    .isLength({ min: 6, max: 16 })
    .withMessage('password must be 6-16 characters in length')
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .withMessage(
      'password must be alphanumeric, contain special character(!@#$%^&*)'
    ),
];
