const User = require('../models/User');
const Cousre = require('../models/Course');
const Subject = require('../models/Subject');
const CourseSubject = require('../models/CourseSubject');
const AcademicBatch = require('../models/AcademicBatch');

const modelSync = async () => {
  try {
    await User.sync();
    await Cousre.sync();
    await Subject.sync();
    await CourseSubject.sync();
    await AcademicBatch.sync();
  } catch (err) {
    console.error(err);
  }
};

module.exports = modelSync;
