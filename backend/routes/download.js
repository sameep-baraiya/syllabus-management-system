const express = require('express');
const { protect } = require('../middleware/auth');
const { download } = require('../controllers/download');
const router = express.Router();

router.route('/uploads/:subdir/:name').get(protect, download);

module.exports = router;
