const ErrorResponse = require('../utils/ErrorResponse');
const Subject = require('../models/Subject');
const User = require('../models/User');

// @desc    Create subject
// @route   POST /api/v1/subject
// @access  Private
exports.createSubject = async (req, res, next) => {
  try {
    const { data } = req.body;

    const {
      // Model Fields
      subjectCode,
      department,
      subjectName,
      subjectShort,
      subjectType,
      subjectDescription,
      headMasterJSON,
      isElective,
      semNo,
      listIndex,
      isOutdated,
      isFreezed,
      cloneTheoryFile,
      clonePracticalFile,
      cloneFiles,
      // New fields
      successer,
      predecessor,
    } = JSON.parse(data);

    const files = [];
    let theoryFile = null;
    let practicalFile = null;

    if (!cloneTheoryFile & (req.files['theory'] !== undefined)) {
      theoryFile = {
        name: req.files['theory'][0].filename,
        path: req.files['theory'][0].path,
      };
    } else {
      theoryFile = cloneTheoryFile;
    }

    if (!clonePracticalFile & (req.files['practical'] !== undefined)) {
      practicalFile = {
        name: req.files['practical'][0].filename,
        path: req.files['practical'][0].path,
      };
    } else {
      practicalFile = clonePracticalFile;
    }

    if (req.files['file']) {
      req.files['file'].forEach((it) => {
        files.push({
          name: it.filename,
          path: it.path,
        });
      });
    }

    const subject = await Subject.findOne({
      where: {
        subjectCode,
      },
    });
    if (subject !== null) {
      return next(new ErrorResponse('Subject already exists', 409));
    }

    let updateNo = 0;
    let successerSub = null;
    let predecessorSub = null;
    if ((successer !== undefined) & (predecessor !== undefined)) {
      if (
        successer.id !== predecessor.id &&
        successer.updateNo - predecessor.updateNo === 2
      ) {
        successerSub = await Subject.findByPk(successer.id);
        if (successerSub === null) {
          return next(
            new ErrorResponse('Bad Request: Successer Subjcet Not Found', 404)
          );
        }

        predecessorSub = await Subject.findByPk(successer.id);
        if (predecessorSub === null) {
          return next(
            new ErrorResponse('Bad Request: Predecessor Subjcet Not Found', 404)
          );
        }
        updateNo = predecessor.updateNo + 1;
      }
    } else {
      if (successer) {
        successerSub = await Subject.findByPk(successer.id);
        if (successerSub === null) {
          return next(
            new ErrorResponse('Bad Request: Successer Subjcet Not Found', 404)
          );
        }
        updateNo = successer.updateNo - 1;
      }
      if (predecessor) {
        predecessorSub = await Subject.findByPk(predecessor.id);
        if (predecessorSub === null) {
          return next(
            new ErrorResponse('Bad Request: Predecessor Subjcet Not Found', 404)
          );
        }
        updateNo = predecessor.updateNo + 1;
      }
    }

    if (cloneFiles) {
      cloneFiles.forEach((file) => {
        files.push(file);
      });
    }

    const crudInfo = {
      type: 'SUBJECT_CREATE',
      by: req.user.name,
    };

    const newSub = await Subject.create({
      subjectCode,
      department,
      subjectName,
      subjectShort,
      subjectType,
      subjectDescription,
      headMasterJSON,
      isElective,
      semNo,
      listIndex,
      isOutdated,
      isFreezed,
      files,
      updateNo,
      crudInfo,
      theoryFile,
      practicalFile,
      noOfFiles: files && files.length,
    });
    if (newSub === null) {
      return next(new ErrorResponse('Bad Request: Bad Subjcet Fields', 400));
    }

    if (predecessorSub) {
      predecessorSub.crudInfo = {
        type: 'SUBJECT_UPDATE_SUCCESSOR_PREDECESSOR',
        by: req.user.name,
      };
      await predecessorSub.setSuccessor(newSub);
      newSub.crudInfo = {
        type: 'SUBJECT_UPDATE_SUCCESSOR_PREDECESSOR',
        by: req.user.name,
      };
      await newSub.setPredecessor(predecessorSub);
    }

    if (successerSub) {
      await newSub.setSuccessor(successerSub);
      await successerSub.setPredecessor(newSub);
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

// @desc    Update subject
// @route   PUT /api/v1/subject/:id
// @access  Private
exports.updateSubject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data } = req.body;

    const {
      // Model Fields
      subjectCode,
      department,
      subjectName,
      subjectShort,
      subjectType,
      subjectDescription,
      headMasterJSON,
      isElective,
      semNo,
      listIndex,
      isOutdated,
      isFreezed,
      cloneTheoryFile,
      clonePracticalFile,
      cloneFiles,
      // New fields
      successer,
      predecessor,
    } = JSON.parse(data);

    const files = [];
    let theoryFile = null;
    let practicalFile = null;

    if (!cloneTheoryFile & (req.files['theory'] !== undefined)) {
      theoryFile = {
        name: req.files['theory'][0].filename,
        path: req.files['theory'][0].path,
      };
    } else {
      theoryFile = cloneTheoryFile;
    }

    if (!clonePracticalFile & (req.files['practical'] !== undefined)) {
      practicalFile = {
        name: req.files['practical'][0].filename,
        path: req.files['practical'][0].path,
      };
    } else {
      practicalFile = clonePracticalFile;
    }

    if (req.files['file']) {
      req.files['file'].forEach((it) => {
        files.push({
          name: it.filename,
          path: it.path,
        });
      });
    }

    const subject = await Subject.findByPk(id);

    if (subject === null) {
      return next(new ErrorResponse('Subject not found', 400));
    }

    let updateNo = 0;
    let successerSub = null;
    let predecessorSub = null;
    if ((successer !== undefined) & (predecessor !== undefined)) {
      if (
        successer.id !== predecessor.id &&
        successer.updateNo - predecessor.updateNo === 2
      ) {
        successerSub = await Subject.findByPk(successer.id);
        if (successerSub === null) {
          return next(
            new ErrorResponse('Bad Request: Successer Subjcet Not Found', 404)
          );
        }

        predecessorSub = await Subject.findByPk(successer.id);
        if (predecessorSub === null) {
          return next(
            new ErrorResponse('Bad Request: Predecessor Subjcet Not Found', 404)
          );
        }
        updateNo = predecessor.updateNo + 1;
      }
    } else {
      if (successer) {
        successerSub = await Subject.findByPk(successer.id);
        if (successerSub === null) {
          return next(
            new ErrorResponse('Bad Request: Successer Subjcet Not Found', 404)
          );
        }
        updateNo = successer.updateNo - 1;
      }
      if (predecessor) {
        predecessorSub = await Subject.findByPk(predecessor.id);
        if (predecessorSub === null) {
          return next(
            new ErrorResponse('Bad Request: Predecessor Subjcet Not Found', 404)
          );
        }
        updateNo = predecessor.updateNo + 1;
      }
    }

    if (cloneFiles) {
      cloneFiles.forEach((file) => {
        files.push(file);
      });
    }

    const crudInfo = {
      type: 'SUBJECT_UPDATE',
      by: req.user.name,
    };

    const newSub = await subject.update({
      subjectCode,
      department,
      subjectName,
      subjectShort,
      subjectType,
      subjectDescription,
      headMasterJSON,
      isElective,
      semNo,
      listIndex,
      isOutdated,
      isFreezed,
      files,
      updateNo,
      crudInfo,
      theoryFile,
      practicalFile,
      noOfFiles: files && files.length,
    });
    if (newSub === null) {
      return next(new ErrorResponse('Bad Request: Bad Subjcet Fields', 400));
    }

    if (predecessorSub) {
      predecessorSub.crudInfo = {
        type: 'SUBJECT_UPDATE_SUCCESSOR_PREDECESSOR',
        by: req.user.name,
      };
      await predecessorSub.setSuccessor(newSub);
      newSub.crudInfo = {
        type: 'SUBJECT_UPDATE_SUCCESSOR_PREDECESSOR',
        by: req.user.name,
      };
      await newSub.setPredecessor(predecessorSub);
    }

    if (successerSub) {
      await newSub.setSuccessor(successerSub);
      await successerSub.setPredecessor(newSub);
    }

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    return next(err);
  }
};

// @desc    Delete subject
// @route   DELETE /api/v1/subject/:id
// @access  Private
exports.deleteSubject = async (req, res, next) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findByPk(req.user.id);

    if (!user.matchPassword(password)) {
      return next(new ErrorResponse('Passowrd not matched', 404));
    }

    const subject = await Subject.findByPk(id);
    if (subject === null) {
      return next(new ErrorResponse('Subject not found', 404));
    }

    subject.crudInfo = {
      type: 'SUBJECT_DELETE',
      by: req.user.name,
    };

    await subject.destroy();

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    return next(err);
  }
};
