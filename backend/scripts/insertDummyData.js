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

    // Subjects
    subjects.forEach(async (subject) => {
      try {
        await Subject.create(subject);
      } catch (err) {
        console.log(err);
      }
    });
    console.log('Subjects Created');
    // const subject1 = await Subject.findOne({
    //   include: {
    //     model: Subject,
    //     as: 'successor',
    //   },
    // });
    // console.log(subject1.toJSON());
    // const subject2 = await Subject.findOne();
    // await subject1.setSuccessor(subject2);

    // Course
    const cousre = await Cousre.create(courseData);
    console.log('Course Created');
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
  crudInfo: {
    type: 'USER_CREATE',
    by: 'Script Manger',
  },
};
const smData = {
  name: 'itsm-mname-lname',
  email: 'sm@ddu.ac.in',
  contactNumber: '1234567890',
  role: 'syllabus-manager',
  department: 'IT - Information Technology',
  password: 'smsm123@',
  crudInfo: {
    type: 'USER_CREATE',
    by: 'Script Manger',
  },
};
const fmData = {
  name: 'itfm-mname-lname',
  email: 'fm@ddu.ac.in',
  contactNumber: '1234567890',
  role: 'faculty-member',
  department: 'IT - Information Technology',
  password: 'fmfm123@',
  crudInfo: {
    type: 'USER_CREATE',
    by: 'Script Manger',
  },
};

const courseData = {
  courseCode: 'BTIT 101',
  courseName: 'BACHELOR OF TECHNOLOGY IN INFORMATION TECHNOLOGY',
  courseType: 'B.Tech - Bachelor of Technology',
  department: 'IT - Information Technology',
  noOfSem: 8,
  monthPerSem: 6,
  isOutdated: false,
  isFreezed: false,
  crudInfo: {
    type: 'COURSE_CREATE',
    by: 'Script Manger',
  },
};

module.exports = insertDummyData;
