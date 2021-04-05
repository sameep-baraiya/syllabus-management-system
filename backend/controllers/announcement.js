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
      return next(
        new ErrorResponse('Error: Unable to create announcement', 400)
      );
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

// @desc    Get Announcement
// @route   GET /api/v1/announcement/:id
// @access  Private
exports.getAnnouncement = async (req, res, next) => {
  const { id } = req.params;
  try {
    const announcement = await Announcement.findByPk(id);
    if (announcement === null) {
      return next(new ErrorResponse('Announcement not found', 404));
    }

    res.status(200).json({
      success: true,
      data: announcement.toJSON(),
    });
  } catch (err) {
    return next(err);
  }
};

// @desc    Update Announcement
// @route   PUT /api/v1/announcement/:id
// @access  Private
exports.updateAnnouncement = async (req, res, next) => {
  const { id } = req.params;

  const { title, msg, department } = req.body;

  try {
    const announcement = await Announcement.findByPk(id);

    if (announcement === null) {
      return next(new ErrorResponse('Announcement not found', 404));
    }

    const newAnnouncement = await announcement.update({
      title,
      msg,
      department,
      crudInfo: {
        type: 'ANNOUNCEMENT_UPDATE',
        by: req.user.name,
      },
    });

    if (newAnnouncement === null) {
      return next(
        new ErrorResponse('Error: Unable to update announcement', 400)
      );
    }

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    return next(err);
  }
};
