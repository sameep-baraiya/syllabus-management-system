const User = require('../models/User');
const Cousre = require('../models/Course');
const Subject = require('../models/Subject');
const CourseSubject = require('../models/CourseSubject');

const dropAllTable = async () => {
  try {
    User.drop();
    console.log('User table dropped!');
    CourseSubject.drop();
    console.log('CourseSubject table dropped!');
    Cousre.drop();
    console.log('Cousre table dropped!');
    Subject.drop();
    console.log('Subject table dropped!');
  } catch (err) {
    console.error(err);
  }
};

module.exports = dropAllTable;
