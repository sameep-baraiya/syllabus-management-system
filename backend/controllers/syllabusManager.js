const ErrorResponse = require('../utils/ErrorResponse');
const Course = require('../models/Course');
const Subject = require('../models/Subject');
const CourseSubject = require('../models/CourseSubject');

// TODO Remove this file
// @desc    Create course with subject
// @route   POST /api/v1/syllabus-manager/course
// @access  Private
exports.createCourseWithSubject = async (req, res, next) => {
  const { course, subjects } = req.body;
  try {
    const courseSql = await Course.create(course);
    for (let i = 0; i < subjects.length; i++) {
      if (subjects[i].alreadyExists) {
        const subject = await Subject.findOne({
          subjectCode: subjects[i].subjectCode,
        });
        await courseSql.addSubject(subject);
        const subjectWithRef = await courseSql.getSubjects({
          where: { id: subject.id },
        });
        const courseSubject = subjectWithRef[0].CourseSubject;
        courseSubject.semNo = subjects[i].semNo;
        await courseSubject.save();
      } else {
        const { alreadyExists, semNo, ...rest } = subjects[i];
        const newSubject = await Subject.create(rest);
        await courseSql.addSubject(newSubject);
        const subjectWithRef = await courseSql.getSubjects({
          where: { id: newSubject.id },
        });
        const courseSubject = subjectWithRef[0].CourseSubject;
        courseSubject.semNo = semNo;
        await courseSubject.save();
      }
    }
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    return next(err);
  }
};
