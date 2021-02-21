const express = require('express');
const { protect } = require('../middleware/auth');
const router = express.Router();
const { createCourseWithSubject } = require('../controllers/course');

router.route('/').post(protect, createCourseWithSubject);

module.exports = router;
