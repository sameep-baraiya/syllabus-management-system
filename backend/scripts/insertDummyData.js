const User = require('../models/User');
const Cousre = require('../models/Course');
const Subject = require('../models/Subject');
const subjects = require('./subjects16-20');

const insertDummyData = async () => {
  try {
    // Users
    const admin = await User.create(adminData);
    console.log('Admin Created');
    const sm = await User.create(smData);
    console.log('Syllabus-Manager Created');
    const fm = await User.create(fmData);
    console.log('Faculty-Member Created');

    // Course
    const cousre = await Cousre.create(courseData);
    console.log('Course Created');

    // Subjects
    subjects.forEach(async (subject) => {
      const newSubject = await Subject.create(subject);
      await cousre.addSubject(newSubject);
      const subjectWithRef = await cousre.getSubjects({
        where: { id: newSubject.id },
      });
      const courseSubject = subjectWithRef[0].CourseSubject;
      courseSubject.semNo = subject.semNo;
      await courseSubject.save();
    });
    console.log('Subjects Created');
  } catch (err) {
    console.error(err);
  }
};

const adminData = {
  name: 'itadmin-mname-lname',
  email: 'admin@ddu.ac.in',
  contactNumber: '1234567890',
  role: 'admin',
  department: 'IT - Information Technology',
  password: 'admin123@',
  isApproved: true,
};
const smData = {
  name: 'itsm-mname-lname',
  email: 'sm@ddu.ac.in',
  contactNumber: '1234567890',
  role: 'syllabus-manager',
  department: 'IT - Information Technology',
  password: 'smsm123@',
};
const fmData = {
  name: 'itfm-mname-lname',
  email: 'fm@ddu.ac.in',
  contactNumber: '1234567890',
  role: 'faculty-member',
  department: 'IT - Information Technology',
  password: 'fmfm123@',
};

const courseData = {
  courseCode: 'ITBTECH2020-20201',
  courseType: 'B.Tech',
  department: 'IT - Information Technology',
  courseLength: 48,
  noOfSemesters: 8,
  updateNo: 0,
};

module.exports = insertDummyData;
