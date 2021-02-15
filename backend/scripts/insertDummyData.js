const User = require('../models/User');
const Cousre = require('../models/Course');
const Subject = require('../models/Subject');
const CourseSubject = require('../models/CourseSubject');

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

    // Subject
    const sub1 = await Subject.create(sub1D);
    console.log('sub1 Created');
    const sub2 = await Subject.create(sub2D);
    console.log('sub2 Created');
    const sub3 = await Subject.create(sub3D);
    console.log('sub3 Created');
    const sub4 = await Subject.create(sub4D);
    console.log('sub4 Created');
    const sub5 = await Subject.create(sub5D);
    console.log('sub5 Created');

    // Sub2 Update
    const sub2U = await Subject.create(sub2DU);
    console.log('sub2U Created');

    // Sub4 Update
    const sub4U = await Subject.create(sub4DU);
    console.log('sub4U Created');
    const sub4UU = await Subject.create(sub4DUU);
    console.log('sub4UU Created');

    // TODO Fix this
    // await cousre.addSubject(sub1);
    // await cousre.addSubject(sub2);
    // await cousre.addSubject(sub3);
    // await cousre.addSubject(sub4);
    // await cousre.addSubject(sub5);

    // // Successor Course
    // const successorCourse = await Cousre.create(successorCourseData);
    // console.log('Successor Course Created');

    // // Successor Subject
    // const successorSubject2 = await Subject.create(successorSubject2Data);
    // console.log('Successor Subject2 Created');

    // await subject2.setSuccessor(successorSubject2);

    // await successorCourse.addSubject(subject1);
    // await successorCourse.addSubject(successorSubject2);

    // await cousre.setSuccessor(successorCourse);
    await sub2.setSuccessor(sub2U);
    await sub2U.setPredecessor(sub2);

    await sub4.setSuccessor(sub4U);

    await sub4U.setPredecessor(sub4);
    await sub4U.setSuccessor(sub4UU);

    await sub4UU.setPredecessor(sub4U);
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

const successorCourseData = {
  courseCode: 'ITBTECH2020-20201 Updated',
  courseType: 'B.Tech',
  department: 'IT - Information Technology',
  courseLength: 48,
  noOfSemesters: 8,
  updateNo: 1,
};

const sub1D = {
  subjectCode: 'SUB101',
  subjectName: 'Subject 1 Name',
  subjectDescription: 'Subject 1 Description',
  subjectShort: 'S1',
  headMasterJSON: {
    headMasters: [
      'Theory',
      'Sessional',
      'Practical',
      'Term Work',
      'Lecture',
      'Tutorial',
      'Practical',
      'L+T',
      'P',
      'Total',
    ],
    headGroups: [
      'Exam Scheme',
      'Exam Scheme',
      'Exam Scheme',
      'Exam Scheme',
      'Teaching Scheme',
      'Teaching Scheme',
      'Teaching Scheme',
      'Credit Structure',
      'Credit Structure',
      'Total',
    ],
    points: [60, 40, 10, 30, 4, 0, 2, 4, 1, 5],
  },
  theory: 'SUB1 CH1,CH2',
  practical: 'SUB1 P1,P2',
  department: 'IT - Information Technology',
  updateNo: 0,
  isElective: false,
};

const sub2D = {
  subjectCode: 'SUB201',
  subjectName: 'Subject 2 Name',
  subjectDescription: 'Subject 2 Description',
  subjectShort: 'S2',
  headMasterJSON: {
    headMasters: [
      'Theory',
      'Sessional',
      'Practical',
      'Term Work',
      'Lecture',
      'Tutorial',
      'Practical',
      'L+T',
      'P',
      'Total',
    ],
    headGroups: [
      'Exam Scheme',
      'Exam Scheme',
      'Exam Scheme',
      'Exam Scheme',
      'Teaching Scheme',
      'Teaching Scheme',
      'Teaching Scheme',
      'Credit Structure',
      'Credit Structure',
      'Total',
    ],
    points: [60, 40, 0, 30, 5, 0, 2, 5, 1, 6],
  },
  theory: 'SUB2 CH1,CH2',
  practical: 'SUB2 P1,P2',
  department: 'IT - Information Technology',
  updateNo: 0,
  isElective: false,
  isOutdated: true,
};

const sub3D = {
  subjectCode: 'SUB301',
  subjectName: 'Subject 3 Name',
  subjectDescription: 'Subject 3 Description',
  subjectShort: 'S3',
  headMasterJSON: {
    headMasters: [
      'Theory',
      'Sessional',
      'Practical',
      'Term Work',
      'Lecture',
      'Tutorial',
      'Practical',
      'L+T',
      'P',
      'Total',
    ],
    headGroups: [
      'Exam Scheme',
      'Exam Scheme',
      'Exam Scheme',
      'Exam Scheme',
      'Teaching Scheme',
      'Teaching Scheme',
      'Teaching Scheme',
      'Credit Structure',
      'Credit Structure',
      'Total',
    ],
    points: [60, 0, 0, 0, 2, 0, 2, 2, 1, 3],
  },
  theory: 'SUB3 CH1,CH2',
  practical: 'SUB3 P1,P2',
  department: 'IT - Information Technology',
  updateNo: 0,
  isElective: false,
};

const sub4D = {
  subjectCode: 'SUB401',
  subjectName: 'Subject 4 Name',
  subjectDescription: 'Subject 4 Description',
  subjectShort: 'S4',
  headMasterJSON: {
    headMasters: [
      'Theory',
      'Sessional',
      'Practical',
      'Term Work',
      'Lecture',
      'Tutorial',
      'Practical',
      'L+T',
      'P',
      'Total',
    ],
    headGroups: [
      'Exam Scheme',
      'Exam Scheme',
      'Exam Scheme',
      'Exam Scheme',
      'Teaching Scheme',
      'Teaching Scheme',
      'Teaching Scheme',
      'Credit Structure',
      'Credit Structure',
      'Total',
    ],
    points: [60, 0, 0, 0, 2, 0, 0, 2, 0, 2],
  },
  theory: 'SUB4 CH1,CH2',
  practical: 'SUB4 P1,P2',
  department: 'IT - Information Technology',
  updateNo: 0,
  isElective: false,
  isOutdated: true,
};

const sub5D = {
  subjectCode: 'SUB501',
  subjectName: 'Subject 5 Name',
  subjectDescription: 'Subject 5 Description',
  subjectShort: 'S5',
  headMasterJSON: {
    headMasters: [
      'Theory',
      'Sessional',
      'Practical',
      'Term Work',
      'Lecture',
      'Tutorial',
      'Practical',
      'L+T',
      'P',
      'Z1',
      'Z2',
      'Total',
    ],
    headGroups: [
      'Exam Scheme',
      'Exam Scheme',
      'Exam Scheme',
      'Exam Scheme',
      'Teaching Scheme',
      'Teaching Scheme',
      'Teaching Scheme',
      'Credit Structure',
      'Credit Structure',
      'Extra',
      'Extra',
      'Total',
    ],
    points: [60, 0, 0, 0, 2, 0, 0, 2, 0, 7, 9, 2],
  },
  theory: 'SUB5 CH1,CH2',
  practical: 'SUB5 P1,P2',
  department: 'IT - Information Technology',
  updateNo: 0,
  isElective: true,
};

const sub2DU = {
  subjectCode: 'SUB202',
  subjectName: 'Subject 2 Name',
  subjectDescription: 'Subject 2 Description (Updated)',
  subjectShort: 'S2',
  headMasterJSON: {
    headMasters: [
      'Theory',
      'Sessional',
      'Practical',
      'Term Work',
      'Lecture',
      'Tutorial',
      'Practical',
      'L+T',
      'P',
      'Total',
    ],
    headGroups: [
      'Exam Scheme',
      'Exam Scheme',
      'Exam Scheme',
      'Exam Scheme',
      'Teaching Scheme',
      'Teaching Scheme',
      'Teaching Scheme',
      'Credit Structure',
      'Credit Structure',
      'Total',
    ],
    points: [60, 40, 0, 30, 6, 0, 2, 6, 1, 7],
  },
  theory: 'SUB2 CH1,CH2,CH3',
  practical: 'SUB2 P1,P2,P3',
  department: 'IT - Information Technology',
  updateNo: 1,
  isElective: false,
};

const sub4DU = {
  subjectCode: 'SUB402',
  subjectName: 'Subject 4 Name',
  subjectDescription: 'Subject 4 Description (Updated)',
  subjectShort: 'S4',
  headMasterJSON: {
    headMasters: [
      'Theory',
      'Sessional',
      'Practical',
      'Term Work',
      'Lecture',
      'Tutorial',
      'Practical',
      'L+T',
      'P',
      'Total',
    ],
    headGroups: [
      'Exam Scheme',
      'Exam Scheme',
      'Exam Scheme',
      'Exam Scheme',
      'Teaching Scheme',
      'Teaching Scheme',
      'Teaching Scheme',
      'Credit Structure',
      'Credit Structure',
      'Total',
    ],
    points: [60, 0, 0, 0, 2, 0, 2, 2, 1, 3],
  },
  theory: 'SUB4 CH1,CH2',
  practical: 'SUB4 P1,P2,P3,P4',
  department: 'IT - Information Technology',
  updateNo: 1,
  isElective: false,
  isOutdated: true,
};

const sub4DUU = {
  subjectCode: 'SUB403',
  subjectName: 'Subject 4 Name',
  subjectDescription: 'Subject 4 Description (Updatedx2)',
  subjectShort: 'S4',
  headMasterJSON: {
    headMasters: [
      'Theory',
      'Sessional',
      'Practical',
      'Term Work',
      'Lecture',
      'Tutorial',
      'Practical',
      'L+T',
      'P',
      'Total',
    ],
    headGroups: [
      'Exam Scheme',
      'Exam Scheme',
      'Exam Scheme',
      'Exam Scheme',
      'Teaching Scheme',
      'Teaching Scheme',
      'Teaching Scheme',
      'Credit Structure',
      'Credit Structure',
      'Total',
    ],
    points: [60, 0, 0, 0, 3, 0, 2, 3, 1, 4],
  },
  theory: 'SUB4 CH1,CH2,CH3,CH4',
  practical: 'SUB4 P1,P2,P3,P4',
  department: 'IT - Information Technology',
  updateNo: 2,
  isElective: false,
};

module.exports = insertDummyData;
