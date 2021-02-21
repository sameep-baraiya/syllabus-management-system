const ErrorResponse = require('../utils/ErrorResponse');
const Subject = require('../models/Subject');

// @desc    Create subject
// @route   POST /api/v1/subject
// @access  Private
exports.createSubject = async (req, res, next) => {
  const { data } = req.body;

  const {
    subjectCode,
    subjectName,
    subjectShort,
    subjectDescription,
    department,
    headMasterJSON,
    theory,
    isElective,
    practical,
  } = JSON.parse(data);
  const files = [];
  req.files.forEach((it) => {
    files.push({
      name: it.filename,
      path: it.path,
    });
  });

  try {
    const subject = await Subject.findOne({
      where: {
        subjectCode,
      },
    });
    if (subject !== null) {
      return next(new ErrorResponse('Subject already exists', 409));
    }

    const newSubject = await Subject.create({
      subjectCode,
      subjectName,
      subjectShort,
      subjectDescription,
      department,
      headMasterJSON,
      theory,
      isElective,
      practical,
      updateNo: 0,
      files,
      noOfFiles: files.length,
    });

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    return next(err);
  }
};

// @desc    Get subjects
// @route   GET /api/v1/subject
// @access  Private
exports.getSubjects = async (req, res, next) => {
  try {
    res.status(200).json(res.advancedResults);
  } catch (err) {
    return next(err);
  }
};

// @desc    Get single subject with specified id
// @route   GET /api/v1/subject/:id
// @access  Private
exports.getSubject = async (req, res, next) => {
  const { id } = req.params;
  try {
    const subject = await Subject.findByPk(id);
    if (subject === null) {
      return next(new ErrorResponse('Subject not found', 404));
    }

    res.status(200).json({
      success: true,
      data: subject.toJSON(),
    });
  } catch (err) {
    return next(err);
  }
};
