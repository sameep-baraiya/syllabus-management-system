const express = require('express');
const { protect } = require('../middleware/auth');
const router = express.Router();
const { getAnnouncements } = require('../controllers/announcement');

router.route('/').get(protect, getAnnouncements);

module.exports = router;
