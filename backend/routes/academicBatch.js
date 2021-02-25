const express = require('express');
const { createAcademicBatch } = require('../controllers/academicBatch');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/').post(protect, createAcademicBatch);

module.exports = router;
