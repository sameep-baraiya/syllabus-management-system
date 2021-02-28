const User = require('../models/User');
const Cousre = require('../models/Course');
const Subject = require('../models/Subject');
const CourseSubject = require('../models/CourseSubject');
const AcademicBatch = require('../models/AcademicBatch');

const dropAllTable = async () => {
  try {
    await User.drop();
    console.log('User table dropped!');
    await CourseSubject.drop();
    console.log('CourseSubject table dropped!');
    await Cousre.drop();
    console.log('Cousre table dropped!');
    await Subject.drop();
    console.log('Subject table dropped!');
    await AcademicBatch.drop();
    console.log('Academic Batch table dropped!');
  } catch (err) {
    console.error(err);
  }
};

module.exports = dropAllTable;
