const db = require('../config/initLevelDB');

// @desc    Get config
// @route   GET /api/v1/config/
// @access  Public
exports.getConfig = async (req, res, next) => {
  try {
    const departmentType = await db.get('DEPARTMENT_TYPE');
    const courseType = await db.get('COURSE_TYPE');
    const subjectType = await db.get('SUBJECT_TYPE');

    res.status(200).json({
      success: true,
      data: { departmentType, courseType, subjectType },
    });
  } catch (err) {
    return next(err);
  }
};
