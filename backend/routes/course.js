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
  .post(protect, createCourse)
  .get(
    protect,
    advancedResult(Course, ['courseCode', 'courseName']),
    getCourses
  );

router
  .route('/:id')
  .get(protect, getCourse)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);

module.exports = router;
