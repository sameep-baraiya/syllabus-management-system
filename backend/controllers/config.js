const db = require('../config/initLevelDB');
const User = require('../models/User');
const CRUDLog = require('../models/CRUDLog');
const ErrorResponse = require('../utils/ErrorResponse');

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

// @desc    Update config
// @route   PUT /api/v1/config/
// @access  Private
exports.updateConfig = async (req, res, next) => {
  try {
    const { departmentType, subjectType, courseType, password } = req.body;

    const user = await User.findByPk(req.user.id);

    if (!user.matchPassword(password)) {
      return next(new ErrorResponse('Passowrd not matched', 404));
    }

    await db.put('DEPARTMENT_TYPE', departmentType);
    await db.put('COURSE_TYPE', courseType);
    await db.put('SUBJECT_TYPE', subjectType);

    await CRUDLog.create({
      msg: `System Config (departmentType, subjectType, courseType) updated`,
      type: 'UPDATE',
      model: 'Config',
      by: user.name,
    });

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    return next(err);
  }
};
