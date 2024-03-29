const User = require('../models/User');
const Cousre = require('../models/Course');
const Subject = require('../models/Subject');
const AcademicBatchSubject = require('../models/AcademicBatchSubject');
const AcademicBatch = require('../models/AcademicBatch');
const Meeting = require('../models/Meeting');
const AccountRequest = require('../models/AccountRequest');
const CRUDLog = require('../models/CRUDLog');
const Announcement = require('../models/Announcement');

const dropAllTable = async () => {
  try {
    await CRUDLog.drop();
    await AccountRequest.drop();
    await User.drop();
    await AcademicBatchSubject.drop();
    await AcademicBatch.drop();
    await Cousre.drop();
    await Subject.drop();
    await Meeting.drop();
    await Announcement.drop();
  } catch (err) {
    console.error(err);
  }
};

module.exports = dropAllTable;
