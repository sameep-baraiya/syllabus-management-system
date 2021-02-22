const express = require('express');
const { protect } = require('../middleware/auth');
const Course = require('../models/Course');
const router = express.Router();
const {
  createCourseWithSubject,
  getCourses,
} = require('../controllers/course');
const advancedResult = require('../middleware/advancedResult');

router
  .route('/')
  .post(protect, createCourseWithSubject)
  .get(protect, advancedResult(Course, ['courseCode']), getCourses);

module.exports = router;
