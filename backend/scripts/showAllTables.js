const User = require('../models/User');
const Cousre = require('../models/Course');
const Subject = require('../models/Subject');
const CourseSubject = require('../models/CourseSubject');

const showAllTables = async () => {
  try {
    const users = await User.findAll();
    console.log('User:');
    users.forEach((it) => {
      console.log(it.toJSON());
    });

    const cousres = await Cousre.findAll();
    console.log('Cousre:');
    cousres.forEach((it) => {
      console.log(it.toJSON());
    });

    const subjects = await Subject.findAll();
    console.log('Subject:');
    subjects.forEach((it) => {
      console.log(it.toJSON());
    });

    const courseSubjects = await CourseSubject.findAll();
    console.log('CourseSubject:');
    courseSubjects.forEach((it) => {
      console.log(it.toJSON());
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = showAllTables;
