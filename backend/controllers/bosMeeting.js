const ErrorResponse = require('../utils/ErrorResponse');
const BOSMeeting = require('../models/BOSMeeting');

// @desc    Create BOSMeeting
// @route   POST /api/v1/bosmeeting
// @access  Private
exports.createBOSMeeting = async (req, res, next) => {
  const { data } = req.body;

  const {
    meetingCode,
    meetingsNotes,
    dateOfMeeting,
    requestedChanges,
    department,
  } = JSON.parse(data);
  const files = [];
  req.files.forEach((it) => {
    files.push({
      name: it.filename,
      path: it.path,
    });
  });

  try {
    const bosmeeting = await BOSMeeting.findOne({
      where: {
        meetingCode,
      },
    });
    if (bosmeeting !== null) {
      return next(new ErrorResponse('Meeting Code already exists', 409));
    }

    const newBosmeeting = await BOSMeeting.create({
      meetingCode,
      meetingsNotes,
      dateOfMeeting,
      requestedChanges,
      department,
      files,
      noOfFiles: files.length,
    });

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    return next(err);
  }
};
