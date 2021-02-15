const express = require('express');
const multer = require('multer');
var mime = require('mime-types');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname + '-' + Date.now() + '.' + mime.extension(file.mimetype)
    );
  },
});
var upload = multer({ storage: storage });
const {
  createSubject,
  getSubjects,
  getSubject,
} = require('../controllers/subject');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/').post(protect, upload.array('file'), createSubject);
router.route('/:id').get(protect, getSubject);
router.route('/').get(protect, getSubjects);

module.exports = router;
