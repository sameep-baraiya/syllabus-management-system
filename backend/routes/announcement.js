const express = require('express');
const { protect } = require('../middleware/auth');
const router = express.Router();
const {
  getAnnouncements,
  createAnnouncement,
  getAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} = require('../controllers/announcement');

router
  .route('/')
  .get(
    protect(['admin', 'faculty-member', 'syllabus-manager']),
    getAnnouncements
  )
  .post(protect(['admin']), createAnnouncement);

router
  .route('/:id')
  .get(
    protect(['admin', 'faculty-member', 'syllabus-manager']),
    getAnnouncement
  )
  .put(protect(['admin']), updateAnnouncement)
  .delete(protect(['admin']), deleteAnnouncement);

module.exports = router;
