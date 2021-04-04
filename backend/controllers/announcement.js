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

// @desc    Create Announcement
// @route   POST /api/v1/announcement/
// @access  Private
exports.createAnnouncement = async (req, res, next) => {
  const { title, msg, department } = req.body;

  try {
    const newAnnouncement = await Announcement.create({
      title,
      msg,
      department,
      crudInfo: {
        type: 'ANNOUNCEMENT_CREATE',
        by: req.user.name,
      },
    });

    if (newAnnouncement === null) {
      return next(new ErrorResponse('Error: Unable to create course', 400));
    }

    io = req.app.get('socketio');
    io.emit('MAKE_ANNOUNCEMENT');

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    return next(err);
  }
};
