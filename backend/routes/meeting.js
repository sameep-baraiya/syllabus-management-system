const express = require('express');
const multer = require('multer');
const mkdirp = require('mkdirp');
var mime = require('mime-types');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads/meetings';
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

const {
  createMeeting,
  getMeetings,
  getMeeting,
  updateMeeting,
  deleteMeeting,
} = require('../controllers/meeting');

// Model
const Meeting = require('../models/Meeting');

// Middleware
const { protect } = require('../middleware/auth');
const advancedResult = require('../middleware/advancedResult');

const router = express.Router();

router
  .route('/')
  .post(
    protect(['admin', 'syllabus-manager']),
    upload.array('file'),
    createMeeting
  )
  .get(
    protect(['admin', 'faculty-member', 'syllabus-manager']),
    advancedResult(Meeting, ['meetingCode']),
    getMeetings
  );

router
  .route('/:id')
  .get(protect(['admin', 'faculty-member', 'syllabus-manager']), getMeeting)
  .put(
    protect(['admin', 'syllabus-manager']),
    upload.array('file'),
    updateMeeting
  )
  .delete(protect(['admin', 'syllabus-manager']), deleteMeeting);

module.exports = router;
