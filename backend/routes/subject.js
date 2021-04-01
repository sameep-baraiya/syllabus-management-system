const express = require('express');
const multer = require('multer');
const mkdirp = require('mkdirp');
var mime = require('mime-types');

// Utils
const ErrorResponse = require('../utils/ErrorResponse');

// Model
const Subject = require('../models/Subject');
const Course = require('../models/Course');

// Middleware
const { protect } = require('../middleware/auth');
const advancedResult = require('../middleware/advancedResult');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads/Subjects';
    mkdirp(dir, (err) => cb(err, dir));
  },
  filename: (req, file, cb) => {
    if (mime.extension(file.mimetype) === 'pdf') {
      cb(null, `${file.originalname}-${Date.now()}.pdf`);
    } else {
      cb(new ErrorResponse('Error: File formate must be pdf', 400));
    }
  },
});

var upload = multer({ storage: storage });

const uploadFiels = upload.fields([
  { name: 'file' },
  { name: 'theory', maxCount: 1 },
  { name: 'practical', maxCount: 1 },
]);

const {
  createSubject,
  getSubjects,
  getSubject,
  updateSubject,
  deleteSubject,
  getSubjectByCode,
} = require('../controllers/subject');

const router = express.Router();

router.route('/').post(protect, uploadFiels, createSubject);
router
  .route('/:id')
  .get(protect, getSubject)
  .delete(protect, deleteSubject)
  .put(protect, uploadFiels, updateSubject);
router
  .route('/')
  .get(
    protect,
    advancedResult(Subject, ['subjectCode', 'subjectName', 'subjectShort']),
    getSubjects
  );
router.route('/code/:code').get(protect, getSubjectByCode);

module.exports = router;
