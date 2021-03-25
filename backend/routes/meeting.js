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

const { createMeeting } = require('../controllers/meeting');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/').post(protect, upload.array('file'), createMeeting);

module.exports = router;
