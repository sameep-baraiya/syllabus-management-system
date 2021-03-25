const ErrorResponse = require('../utils/ErrorResponse');
const AcademicBatch = require('../models/AcademicBatch');
const AcademicBatchSubject = require('../models/AcademicBatchSubject');
const Course = require('../models/Course');
const Subject = require('../models/Subject');
const User = require('../models/User');
const createABFiles = require('../utils/createABFiles');

// @desc    Create Academic Batch
// @route   POST /api/v1/academic-batch
// @access  Private
exports.createAcademicBatch = async (req, res, next) => {
  try {
    const {
      academicBatchCode,
      academicBatchDescription,
      academicBatchName,
      startYear,
      endYear,
      courseId,
      subjects,
      isFreezed,
    } = req.body;

    const academicBatch = await AcademicBatch.findOne({
      where: {
        academicBatchCode,
      },
    });

    if (academicBatch) {
      return next(new ErrorResponse('Academic Batch allready exists', 400));
    }

    let course = null;
    if (courseId) {
      course = await Course.findByPk(courseId, {
        attributes: ['id'],
      });

      if (!course) {
        return next(new ErrorResponse('Course not exists', 400));
      }
    }

    const subjectsArr = [];
    if (subjects) {
      for (let i = 0; i < subjects.length; i++) {
        const tempSub = await Subject.findByPk(subjects[i], {
          attributes: ['id'],
        });

        if (!tempSub) {
          return next(new ErrorResponse('Subject not exists', 400));
        }

        subjectsArr.push(tempSub);
      }
    }

    const newAcademicBatch = await AcademicBatch.create({
      academicBatchCode,
      academicBatchDescription,
      academicBatchName,
      startYear,
      endYear,
      isFreezed,
      crudInfo: {
        type: 'ACADEMIC_BATCH_CREATE',
        by: req.user.name,
      },
    });

    if (!newAcademicBatch) {
      return next(new ErrorResponse('Not able create Academic Batch', 400));
    }

    if (course) {
      newAcademicBatch.crudInfo = {
        type: 'ACADEMIC_BATCH_UPDATE',
        by: req.user.name,
      };
      await newAcademicBatch.setCourse(course);
    }

    if (subjectsArr.length !== 0) {
      newAcademicBatch.crudInfo = {
        type: 'ACADEMIC_BATCH_UPDATE',
        by: req.user.name,
      };
      await newAcademicBatch.addSubjects(subjectsArr);
    }

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    return next(err);
  }
};

// TODO Refactor
// @desc    Get academic batches
// @route   GET /api/v1/academic-batch
// @access  Private
exports.getAcademicBatches = async (req, res, next) => {
  try {
    res.status(200).json(res.advancedResults);
  } catch (err) {
    return next(err);
  }
};

// @desc    Get single academic batch with specified id
// @route   GET /api/v1/academic-batch/:id
// @access  Private
exports.getAcademicBatch = async (req, res, next) => {
  const { id } = req.params;
  const { nestSelect } = req.query;
  try {
    const academicBatch = await AcademicBatch.findByPk(id);
    if (academicBatch === null) {
      return next(new ErrorResponse('Academic Batch not found', 404));
    }

    // TODO Fix
    if (nestSelect) {
      const course = await academicBatch.getCourse({
        attributes: [
          'id',
          'courseCode',
          'courseName',
          'courseType',
          'department',
        ],
      });
      const subjects = await academicBatch.getSubjects({
        attributes: [
          'id',
          'subjectCode',
          'subjectName',
          'subjectShort',
          'semNo',
          'listIndex',
        ],
      });
      const newSubjects = [];

      subjects.forEach((sub) => {
        const tempSub = sub.toJSON();
        delete tempSub.AcademicBatchSubject;
        newSubjects.push(tempSub);
      });

      res.status(200).json({
        success: true,
        data: {
          ...academicBatch.toJSON(),
          course: course.toJSON(),
          subjects: newSubjects,
        },
      });
    } else {
      res.status(200).json({
        success: true,
        data: academicBatch.toJSON(),
      });
    }
  } catch (err) {
    return next(err);
  }
};

// @desc    Create file
// @route   POST /api/v1/academic-batch/:id
// @access  Private
exports.createFile = async (req, res, next) => {
  const { id } = req.params;
  const { type, socketId } = req.body;
  try {
    const academicBatch = await AcademicBatch.findByPk(id);
    if (academicBatch === null) {
      return next(new ErrorResponse('Academic Batch not found', 404));
    }

    const course = await academicBatch.getCourse({
      attributes: [
        'id',
        'courseCode',
        'courseName',
        'courseType',
        'department',
      ],
    });

    const subjects = await academicBatch.getSubjects({
      attributes: [
        'id',
        'subjectCode',
        'subjectName',
        'subjectType',
        'department',
        'subjectShort',
        'headMasterJSON',
        'theoryFile',
        'practicalFile',
        'semNo',
        'listIndex',
        'isElective',
      ],
    });
    const newSubjects = [];

    subjects.forEach((sub) => {
      const tempSub = sub.toJSON();
      delete tempSub.AcademicBatchSubject;
      newSubjects.push(tempSub);
    });

    const data = {
      ...academicBatch.toJSON(),
      course: course.toJSON(),
      subjects: newSubjects,
    };

    const io = req.app.get('socketio');

    createABFiles(academicBatch, type, data, req.user, io, socketId);
    console.log('red'.red);

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    return next(err);
  }
};

// @desc    Update Academic Batch
// @route   PUT /api/v1/academic-batch/:id
// @access  Private
exports.updateAcademicBatch = async (req, res, next) => {
  const { id } = req.params;

  const {
    academicBatchCode,
    academicBatchDescription,
    academicBatchName,
    startYear,
    endYear,
    courseId,
    subjects,
    isFreezed,
  } = req.body;

  try {
    const academicBatch = await AcademicBatch.findByPk(id);

    if (academicBatch === null) {
      return next(
        new ErrorResponse('Error: Academic Batch does not exist', 400)
      );
    }

    let course = null;
    if (courseId) {
      course = await Course.findByPk(courseId, {
        attributes: ['id'],
      });

      if (!course) {
        return next(new ErrorResponse('Course not exists', 400));
      }
    }

    const subjectsArr = [];
    if (subjects) {
      for (let i = 0; i < subjects.length; i++) {
        const tempSub = await Subject.findByPk(subjects[i], {
          attributes: ['id'],
        });

        if (!tempSub) {
          return next(new ErrorResponse('Subject not exists', 400));
        }

        subjectsArr.push(tempSub);
      }
    }

    const newAcademicBatch = await academicBatch.update({
      academicBatchCode,
      academicBatchDescription,
      academicBatchName,
      startYear,
      endYear,
      courseId,
      subjects,
      isFreezed,
      crudInfo: {
        type: 'ACADEMIC_BATCH_UPDATE',
        by: req.user.name,
      },
    });

    if (newAcademicBatch === null) {
      return next(
        new ErrorResponse('Error: Unable to update academic batch', 400)
      );
    }

    if (course) {
      newAcademicBatch.crudInfo = {
        type: 'ACADEMIC_BATCH_UPDATE',
        by: req.user.name,
      };
      await newAcademicBatch.setCourse(course);
    }

    if (subjectsArr.length !== 0) {
      newAcademicBatch.crudInfo = {
        type: 'ACADEMIC_BATCH_UPDATE',
        by: req.user.name,
      };
      await newAcademicBatch.setSubjects(subjectsArr);
    }

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    return next(err);
  }
};

// @desc    Delete Academic Batch
// @route   DELETE /api/v1/academic-batch/:id
// @access  Private
exports.deleteAcademicBatch = async (req, res, next) => {
  console.log('Yes'.green);
  const { id } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findByPk(req.user.id);

    if (!user.matchPassword(password)) {
      return next(new ErrorResponse('Passowrd not matched', 404));
    }

    const academicBatch = await AcademicBatch.findByPk(id);
    if (academicBatch === null) {
      return next(new ErrorResponse('academicBatch not found', 404));
    }

    await academicBatch.removeSubjects();

    academicBatch.crudInfo = {
      type: 'ACADEMIC_BATCH_DELETE',
      by: req.user.name,
    };

    await academicBatch.destroy();

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    return next(err);
  }
};
