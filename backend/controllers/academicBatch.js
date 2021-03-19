const ErrorResponse = require('../utils/ErrorResponse');
const AcademicBatch = require('../models/AcademicBatch');
const AcademicBatchSubject = require('../models/AcademicBatchSubject');
const Course = require('../models/Course');
const Subject = require('../models/Subject');

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
