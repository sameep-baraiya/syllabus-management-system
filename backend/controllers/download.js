const fs = require('fs');
const ErrorResponse = require('../utils/ErrorResponse');

// @desc    Download file
// @route   GET /api/v1/download/:name
// @access  Public
exports.download = async (req, res, next) => {
  try {
    if (fs.existsSync(`./uploads/${req.params.name}`)) {
      res.download(`./uploads/${req.params.name}`);
    } else {
      return next(new ErrorResponse('Error: File not found', 400));
    }
  } catch (err) {
    return next(err);
  }
};
