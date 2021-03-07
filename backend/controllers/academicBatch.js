const ErrorResponse = require('../utils/ErrorResponse');
const AcademicBatch = require('../models/AcademicBatch');
const Course = require('../models/Course');

// @desc    Create Academic Batch
// @route   POST /api/v1/academic-batch
// @access  Private
exports.createAcademicBatch = async (req, res, next) => {
  try {
    const {
      academicBatchCode,
      academicBatchDescription,
      academicBatchName,
      yearLable,
      courseCode,
    } = req.body;

    const academicBatch = await AcademicBatch.create({
      academicBatchCode,
      academicBatchDescription,
      academicBatchName,
      yearLable,
    });

    if (academicBatch === null) {
      return next(
        new ErrorResponse('Error: While creating Academic Batch', 400)
      );
    }

    let course = await Course.findOne({
      where: {
        courseCode,
      },
    });

    if (course === null) {
      return next(
        new ErrorResponse('Error: Bad request course not exists', 400)
      );
    }

    course.addAcademicBatch(academicBatch);

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    return next(err);
  }
};
