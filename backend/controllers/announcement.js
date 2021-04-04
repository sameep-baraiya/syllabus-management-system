const ErrorResponse = require('../utils/ErrorResponse');
const Announcement = require('../models/Announcement');

// @desc    Get Announcements
// @route   GET /api/v1/announcement/
// @access  Private
exports.getAnnouncements = async (req, res, next) => {
  try {
    const announcements = await Announcement.findAll();

    res.status(200).json({
      success: true,
      data: announcements.map((it) => it.toJSON()),
    });
  } catch (err) {
    return next(err);
  }
};
