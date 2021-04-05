const express = require('express');
const { protect } = require('../middleware/auth');
const Course = require('../models/Course');
// const Subject = require('../models/Subject');
const router = express.Router();
const {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/course');
const advancedResult = require('../middleware/advancedResult');

router
  .route('/')
  .post(protect(['admin', 'syllabus-manager']), createCourse)
  .get(
    protect(['admin', 'faculty-member', 'syllabus-manager']),
    advancedResult(Course, ['courseCode', 'courseName']),
    getCourses
  );

router
  .route('/:id')
  .get(protect(['admin', 'faculty-member', 'syllabus-manager']), getCourse)
  .put(protect(['admin', 'syllabus-manager']), updateCourse)
  .delete(protect(['admin', 'syllabus-manager']), deleteCourse);

module.exports = router;
