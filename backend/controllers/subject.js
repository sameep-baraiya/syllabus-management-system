const ErrorResponse = require('../utils/ErrorResponse');
const Subject = require('../models/Subject');

// @desc    Create subject
// @route   POST /api/v1/subject
// @access  Private
exports.createSubject = async (req, res, next) => {
  const { data } = req.body;

  const {
    // Model Fields
    subjectCode,
    subjectName,
    subjectShort,
    subjectDescription,
    department,
    headMasterJSON,
    semNo,
    listIndex,
    theory,
    isElective,
    practical,
    // Context For Different Type Of Creation Handling
    createContext,
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

    switch (createContext.method) {
      case 'CREATE':
        await Subject.create({
          subjectCode,
          subjectName,
          subjectShort,
          subjectDescription,
          department,
          headMasterJSON,
          semNo,
          listIndex,
          theory,
          isElective,
          practical,
          updateNo: 0,
          files,
          noOfFiles: files.length,
          isFreezed: false,
        });
        break;
      case 'CLONE_CREATE':
        // TODO Clone Create
        break;
      case 'UPDATE_CREATE':
        // TODO Update Create
        break;
      default:
        return next(new ErrorResponse('Bad Request: Create Subjcet', 400));
    }

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    return next(err);
  }
};

// TODO Refactor
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

// TODO Refactor
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
