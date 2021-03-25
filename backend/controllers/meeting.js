const ErrorResponse = require('../utils/ErrorResponse');
const Meeting = require('../models/Meeting');

// @desc    Create Meeting
// @route   POST /api/v1/meeting
// @access  Private
exports.createMeeting = async (req, res, next) => {
  const { data } = req.body;

  const {
    meetingCode,
    meetingsNotes,
    meetingType,
    dateOfMeeting,
    requestedChanges,
    department,
    isFreezed,
  } = JSON.parse(data);

  const files = [];
  req.files.forEach((it) => {
    files.push({
      name: it.filename,
      path: it.path,
    });
  });

  try {
    const meeting = await Meeting.findOne({
      where: {
        meetingCode,
      },
    });
    if (meeting !== null) {
      return next(new ErrorResponse('Meeting Code already exists', 409));
    }

    const newMeeting = await Meeting.create({
      meetingCode,
      meetingsNotes,
      meetingType,
      dateOfMeeting,
      requestedChanges,
      department,
      files,
      isFreezed,
      noOfFiles: files.length,
      crudInfo: {
        type: 'MEETING_CREATE',
        by: req.user.name,
      },
    });

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    return next(err);
  }
};