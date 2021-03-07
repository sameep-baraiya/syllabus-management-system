const express = require('express');
const multer = require('multer');
const mkdirp = require('mkdirp');
var mime = require('mime-types');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads/BOSMeetings';
    mkdirp(dir, (err) => cb(err, dir));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname + '-' + Date.now() + '.' + mime.extension(file.mimetype)
    );
  },
});
var upload = multer({ storage: storage });
const { createBOSMeeting } = require('../controllers/bosMeeting');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/').post(protect, upload.array('file'), createBOSMeeting);

module.exports = router;
