const fs = require('fs');
const ErrorResponse = require('../utils/ErrorResponse');

// @desc    Download file
// @route   GET /api/v1/download/uploads/:subdir/:name
// @access  Public
exports.download = async (req, res, next) => {
  const path = `./uploads/${req.params.subdir}/${req.params.name}`;
  try {
    if (fs.existsSync(path)) {
      res.download(path, req.params.name);
    } else {
      return next(new ErrorResponse('Error: File not found', 400));
    }
  } catch (err) {
    return next(err);
  }
};
