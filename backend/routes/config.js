const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getConfig, updateConfig } = require('../controllers/config');

router.route('/').get(getConfig).put(protect, updateConfig);

module.exports = router;
