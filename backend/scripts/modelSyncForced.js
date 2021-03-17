const User = require('../models/User');
const Cousre = require('../models/Course');
const Subject = require('../models/Subject');
// const CourseSubject = require('../models/CourseSubject');
// const AcademicBatch = require('../models/AcademicBatch');
// const BOSMeeting = require('../models/BOSMeeting');
// const ACMeeting = require('../models/ACMeeting');
const CRUDLog = require('../models/CRUDLog');

const modelSyncForced = async () => {
  try {
    await CRUDLog.sync({ force: true });
    await User.sync({ force: true });
    await Subject.sync({ force: true });
    await Cousre.sync({ force: true });
  } catch (err) {
    console.error(err);
  }
};

module.exports = modelSyncForced;
