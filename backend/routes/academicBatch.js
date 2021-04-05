const express = require('express');
const {
  createAcademicBatch,
  getAcademicBatches,
  getAcademicBatch,
  createFile,
  updateAcademicBatch,
  deleteAcademicBatch,
} = require('../controllers/academicBatch');

// Model
const AcademicBatch = require('../models/AcademicBatch');

// Middleware
const { protect } = require('../middleware/auth');
const advancedResult = require('../middleware/advancedResult');
const router = express.Router();

router
  .route('/')
  .post(protect(['admin', 'syllabus-manager']), createAcademicBatch)
  .get(
    protect(['admin', 'faculty-member', 'syllabus-manager']),
    advancedResult(AcademicBatch, ['academicBatchCode', 'academicBatchName']),
    getAcademicBatches
  );

router
  .route('/:id')
  .get(
    protect(['admin', 'faculty-member', 'syllabus-manager']),
    getAcademicBatch
  )
  .post(protect(['admin', 'syllabus-manager']), createFile)
  .put(protect(['admin', 'syllabus-manager']), updateAcademicBatch)
  .delete(protect(['admin', 'syllabus-manager']), deleteAcademicBatch);

module.exports = router;
