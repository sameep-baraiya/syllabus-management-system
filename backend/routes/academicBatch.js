const express = require('express');
const {
  createAcademicBatch,
  getAcademicBatches,
} = require('../controllers/academicBatch');

// Model
const AcademicBatch = require('../models/AcademicBatch');

// Middleware
const { protect } = require('../middleware/auth');
const advancedResult = require('../middleware/advancedResult');
const router = express.Router();

router
  .route('/')
  .post(protect, createAcademicBatch)
  .get(
    protect,
    advancedResult(AcademicBatch, ['academicBatchCode', 'academicBatchName']),
    getAcademicBatches
  );

module.exports = router;
