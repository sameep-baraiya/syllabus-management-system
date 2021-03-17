const express = require('express');
const { protect } = require('../middleware/auth');
// const Course = require('../models/Course');
// const Subject = require('../models/Subject');
const router = express.Router();
const { createCourse } = require('../controllers/course');
// const advancedResult = require('../middleware/advancedResult');

router.route('/').post(protect, createCourse);

module.exports = router;
