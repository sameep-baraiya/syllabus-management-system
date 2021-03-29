const express = require('express');
const { protect } = require('../middleware/auth');
const router = express.Router();
const { getStorageInfo } = require('../controllers/storage');

router.route('/info').get(protect, getStorageInfo);

module.exports = router;
