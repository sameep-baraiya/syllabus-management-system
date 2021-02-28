const ErrorResponse = require('../utils/ErrorResponse');

// TODO Improve this by warping error with ErrorResponse class.
const errorHandler = async (err, req, res, next) => {
  // Log to console for dev
  if (process.env.NODE_ENV === 'development') {
    console.log('-----ERROR-----'.red.underline);
    console.log(err);
    console.log('---------------'.red.underline);
  }

  if (err.errorFlag === 'express-validator') {
    res.status(err.statusCode || 500).json({
      success: false,
      error: {
        message: err.message,
        flag: 'express-validator',
        errors: err.payload,
      },
    });
    return;
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: { message: err.message || 'Server Error' },
  });
};

module.exports = errorHandler;
