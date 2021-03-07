const User = require('../models/User');
// const Cousre = require('../models/Course');
const Subject = require('../models/Subject');
// const CourseSubject = require('../models/CourseSubject');
// const AcademicBatch = require('../models/AcademicBatch');
// const BOSMeeting = require('../models/BOSMeeting');
// const ACMeeting = require('../models/ACMeeting');
const CRUDLog = require('../models/CRUDLog');

const modelSync = async () => {
  try {
    await CRUDLog.sync();
    await User.sync();
    // await Cousre.sync();
    // await AcademicBatch.sync();
    await Subject.sync();
    // await CourseSubject.sync();
    // await BOSMeeting.sync();
    // await ACMeeting.sync();
  } catch (err) {
    console.error(err);
  }
};

module.exports = modelSync;
