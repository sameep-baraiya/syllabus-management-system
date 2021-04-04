const User = require('../models/User');
const Cousre = require('../models/Course');
const Subject = require('../models/Subject');
const AcademicBatchSubject = require('../models/AcademicBatchSubject');
const AcademicBatch = require('../models/AcademicBatch');
const Meeting = require('../models/Meeting');
const AccountRequest = require('../models/AccountRequest');
const CRUDLog = require('../models/CRUDLog');
const Announcement = require('../models/Announcement');

const modelSync = async () => {
  try {
    await CRUDLog.sync();
    await User.sync();
    await AccountRequest.sync();
    await Cousre.sync();
    await AcademicBatch.sync();
    await Subject.sync();
    await AcademicBatchSubject.sync();
    await Meeting.sync();
    await Announcement.sync();
  } catch (err) {
    console.error(err);
  }
};

module.exports = modelSync;
