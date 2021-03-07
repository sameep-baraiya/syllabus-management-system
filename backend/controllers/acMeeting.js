const ErrorResponse = require('../utils/ErrorResponse');
const ACMeeting = require('../models/ACMeeting');

// @desc    Create ACMeeting
// @route   POST /api/v1/acmeeting
// @access  Private
exports.createACMeeting = async (req, res, next) => {
  const { data } = req.body;

  const {
    meetingCode,
    meetingsNotes,
    dateOfMeeting,
    requestedChanges,
    subjectChanges,
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
    const acmeeting = await ACMeeting.findOne({
      where: {
        meetingCode,
      },
    });
    if (acmeeting !== null) {
      return next(new ErrorResponse('Meeting Code already exists', 409));
    }

    const newAcmeeting = await ACMeeting.create({
      meetingCode,
      meetingsNotes,
      dateOfMeeting,
      requestedChanges,
      subjectChanges,
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
