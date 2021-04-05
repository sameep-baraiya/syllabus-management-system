const express = require('express');
const { protect } = require('../middleware/auth');
const router = express.Router();
const {
  getAnnouncements,
  createAnnouncement,
  getAnnouncement,
  updateAnnouncement,
} = require('../controllers/announcement');

router
  .route('/')
  .get(protect, getAnnouncements)
  .post(protect, createAnnouncement);

router
  .route('/:id')
  .get(protect, getAnnouncement)
  .put(protect, updateAnnouncement);

module.exports = router;
