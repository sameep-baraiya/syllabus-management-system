const express = require('express');
const { protect } = require('../middleware/auth');
const router = express.Router();
const {
  getAnnouncements,
  createAnnouncement,
} = require('../controllers/announcement');

router
  .route('/')
  .get(protect, getAnnouncements)
  .post(protect, createAnnouncement);

module.exports = router;
