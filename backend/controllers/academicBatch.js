const ErrorResponse = require('../utils/ErrorResponse');
const AcademicBatch = require('../models/AcademicBatch');

// @desc    Create Academic Batch
// @route   POST /api/v1/academic-batch
// @access  Private
exports.createAcademicBatch = async (req, res, next) => {
  try {
    const academicBatch = await AcademicBatch.create(req.body);

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    return next(err);
  }
};
