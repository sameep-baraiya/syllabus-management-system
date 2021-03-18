const User = require('../models/User');
const Cousre = require('../models/Course');
const Subject = require('../models/Subject');
const AcademicBatchSubject = require('../models/AcademicBatchSubject');
const AcademicBatch = require('../models/AcademicBatch');
// const BOSMeeting = require('../models/BOSMeeting');
// const ACMeeting = require('../models/ACMeeting');
const CRUDLog = require('../models/CRUDLog');

const dropAllTable = async () => {
  try {
    await CRUDLog.drop();
    await User.drop();
    await AcademicBatchSubject.drop();
    await AcademicBatch.drop();
    await Cousre.drop();
    await Subject.drop();
    // await BOSMeeting.drop();
    // await ACMeeting.drop();
  } catch (err) {
    console.error(err);
  }
};

module.exports = dropAllTable;
