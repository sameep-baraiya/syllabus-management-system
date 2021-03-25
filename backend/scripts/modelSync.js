const User = require('../models/User');
const Cousre = require('../models/Course');
const Subject = require('../models/Subject');
const AcademicBatchSubject = require('../models/AcademicBatchSubject');
const AcademicBatch = require('../models/AcademicBatch');
const Meeting = require('../models/Meeting');
const CRUDLog = require('../models/CRUDLog');

const modelSync = async () => {
  try {
    await CRUDLog.sync();
    await User.sync();
    await Cousre.sync();
    await AcademicBatch.sync();
    await Subject.sync();
    await AcademicBatchSubject.sync();
    await Meeting.sync();
  } catch (err) {
    console.error(err);
  }
};

module.exports = modelSync;
