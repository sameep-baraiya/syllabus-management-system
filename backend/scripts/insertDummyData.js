const User = require('../models/User');
const Cousre = require('../models/Course');
const Subject = require('../models/Subject');
const AcademicBatchSubject = require('../models/AcademicBatchSubject');
const AcademicBatch = require('../models/AcademicBatch');
const Meeting = require('../models/Meeting');
const CRUDLog = require('../models/CRUDLog');
const Announcement = require('../models/Announcement');
const subjects = require('./subjects16-20');
const db = require('../config/initLevelDB');

const insertDummyData = async () => {
  try {
    // Init department, course, subject type in levelDB
    await db.put('DEPARTMENT_TYPE', [
      'CH - Chemical Engineering',
      'CI - Civil Engineering',
      'CE - Computer Engineering',
      'EC - Electronic Engineering',
      'ME - Mechanical Engineering',
      'IT - Information Technology',
      'Keep Empty For Now',
    ]);

    await db.put('COURSE_TYPE', [
      'B.Tech - Bachelor of Technology',
      'M.Tech - Master of Technology',
      'Ph.D. - Doctoral Programmes',
      'B.Pharma - Bachelor of Pharmacy',
      'Keep Empty For Now',
    ]);

    await db.put('SUBJECT_TYPE', [
      'Subject Type 1',
      'Subject Type 2',
      'Subject Type 3',
      'Subject Type 4',
      'Keep Empty For Now',
    ]);
    console.log('Level DB init Done');

    // Users
    const admin = await User.create(adminData);
    console.log('Admin Created');
    const sm = await User.create(smData);
    console.log('Syllabus-Manager Created');
    const fm = await User.create(fmData);
    console.log('Faculty-Member Created');

    // Subjects
    const subjectsArray = [];
    subjects.forEach(async (subject) => {
      try {
        const tempSub = await Subject.create(subject);
        subjectsArray.push(tempSub);
      } catch (err) {
        console.log(err);
      }
    });
    // console.log('Subjects Created');
    // const subject1 = await Subject.findOne({
    //   include: {
    //     model: Subject,
    //     as: 'successor',
    //   },
    // });
    // console.log(subject1.toJSON());
    // const subject2 = await Subject.findOne();
    // await subject1.setSuccessor(subject2);

    // const sub1 = await Subject.create(subjects[0]);
    // const sub2 = await Subject.create(subjects[1]);
    // const sub3 = await Subject.create(subjects[2]);

    // Course
    const cousre = await Cousre.create(courseData);
    console.log('Course Created');

    const academicBatch = await AcademicBatch.create(academicBatchData);
    console.log('Academic Batch Created');

    academicBatch.crudInfo = {
      type: 'ACADEMIC_BATCH_UPDATE',
      by: 'Script Manger',
    };
    await academicBatch.setCourse(cousre);

    academicBatch.crudInfo = {
      type: 'ACADEMIC_BATCH_UPDATE',
      by: 'Script Manger',
    };
    // academicBatch.addSubjects([sub1, sub2, sub3]);
    await academicBatch.addSubjects(subjectsArray);

    const bosMeeting = await Meeting.create(bosMeetingData);
    console.log('BOS Meeting Created');
    const acMeeting = await Meeting.create(acMeetingData);
    console.log('AC Meeting Created');

    const announcement = await Announcement.create({
      title: 'New Subject Announcement',
      msg: 'There will be new subject in our course BT 127',
      department: 'IT - Information Technology',
      crudInfo: {
        type: 'ANNOUNCEMENT_CREATE',
        by: 'Script Manger',
      },
    });
    console.log('Announcement Created');

    const v1Subject = await Subject.create(v1SubjectData);
    const v2Subject = await Subject.create(v2SubjectData);
    const v3Subject = await Subject.create(v3SubjectData);

    v1Subject.crudInfo = {
      type: 'SUBJECT_UPDATE_SUCCESSOR_PREDECESSOR',
      by: 'Script Manger User',
    };
    v2Subject.crudInfo = {
      type: 'SUBJECT_UPDATE_SUCCESSOR_PREDECESSOR',
      by: 'Script Manger User',
    };
    v3Subject.crudInfo = {
      type: 'SUBJECT_UPDATE_SUCCESSOR_PREDECESSOR',
      by: 'Script Manger User',
    };

    await v1Subject.setSuccessor(v2Subject);

    await v2Subject.setPredecessor(v1Subject);
    await v2Subject.setSuccessor(v3Subject);

    await v3Subject.setPredecessor(v2Subject);
    console.log('Subject Version Created');
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

const academicBatchData = {
  academicBatchCode: 'AB16-20',
  academicBatchName: 'IT 2016-2020',
  startYear: '2016',
  endYear: '2020',
  isFreezed: false,
  crudInfo: {
    type: 'ACADEMIC_BATCH_CREATE',
    by: 'Script Manger',
  },
};

const bosMeetingData = {
  meetingCode: 'BOS 2021',
  meetingsNotes: 'BOS Meeting Notes',
  meetingType: 'bos',
  dateOfMeeting: new Date(),
  department: 'IT - Information Technology',
  requestedChanges: [
    {
      type: 'add',
      cType: 'btech',
      mType: 'None',
      description: 'Added New Subject For Sem 2 student',
      linkedSubjectCode: 'NEWSUB',
      linkedSubjectName: 'THE NEW SUBJECT',
      effectiveFrom: new Date(),
      isApproved: false,
    },
    {
      type: 'mod',
      cType: 'mtech',
      mType: 'theory',
      description: 'Modifed thoery of subject MODSUB added new topices',
      linkedSubjectCode: 'MODSUB',
      linkedSubjectName: 'MODIFED SUBJECT',
      effectiveFrom: new Date(),
      isApproved: true,
    },
    {
      type: 'dep',
      cType: 'btech',
      mType: 'None',
      description: 'Deprecation of subject DEPSUB',
      linkedSubjectCode: 'DEPSUB',
      linkedSubjectName: 'DEPRECATION SUBJECT',
      effectiveFrom: new Date(),
      isApproved: true,
    },
  ],
  isFreezed: false,
  crudInfo: {
    type: 'MEETING_CREATE',
    by: 'Script Manger',
  },
};

const acMeetingData = {
  meetingCode: 'AC 2021',
  meetingsNotes: 'AC Meeting Notes',
  meetingType: 'ac',
  dateOfMeeting: new Date(),
  department: 'IT - Information Technology',
  requestedChanges: [
    {
      type: 'add',
      cType: 'btech',
      mType: 'None',
      description: 'Added New Subject For Sem 2 student',
      linkedSubjectCode: 'NEWSUB',
      linkedSubjectName: 'THE NEW SUBJECT',
      effectiveFrom: new Date(),
      isApproved: false,
    },
    {
      type: 'mod',
      mType: 'theory',
      cType: 'mtech',
      description: 'Modifed thoery of subject MODSUB but no new topices',
      linkedSubjectCode: 'MODSUB',
      linkedSubjectName: 'MODIFED SUBJECT',
      effectiveFrom: new Date(),
      isApproved: true,
    },
    {
      type: 'dep',
      cType: 'btech',
      mType: 'None',
      description: 'Deprecation of subject DEPSUB',
      linkedSubjectCode: 'DEPSUB',
      linkedSubjectName: 'DEPRECATION SUBJECT',
      effectiveFrom: new Date(),
      isApproved: false,
    },
  ],
  isFreezed: false,
  crudInfo: {
    type: 'MEETING_CREATE',
    by: 'Script Manger',
  },
};

const v1SubjectData = {
  subjectCode: 'VER 101',
  subjectName: 'VERSION DEMO 1',
  subjectShort: 'VER-1',
  headMasterJSON: {
    headMasters: [
      'Lecture',
      'Tutorial',
      'Practical',
      'L+T',
      'P',
      'Total CS',
      'Theory',
      'Sessional',
      'Practical',
      'Term Work',
      'Total ES',
    ],
    headGroups: ['Teaching Scheme', 'Credit Structure', 'Exam Scheme'],
    headGroupsLength: [3, 3, 5],
    points: [4, 0, 0, 4, 0, 4, 60, 40, 0, 0, 100],
  },
  subjectType: 'Subject Type 1',
  department: 'IT - Information Technology',
  updateNo: 0,
  isElective: false,
  semNo: 1,
  listIndex: 1,
  isFreezed: false,
  crudInfo: {
    type: 'SUBJECT_CREATE',
    by: 'Script Manger User',
  },
};

const v2SubjectData = {
  subjectCode: 'VER 102',
  subjectName: 'VERSION DEMO 2',
  subjectShort: 'VER-2',
  headMasterJSON: {
    headMasters: [
      'Lecture',
      'Tutorial',
      'Practical',
      'L+T',
      'P',
      'Total CS',
      'Theory',
      'Sessional',
      'Practical',
      'Term Work',
      'Total ES',
    ],
    headGroups: ['Teaching Scheme', 'Credit Structure', 'Exam Scheme'],
    headGroupsLength: [3, 3, 5],
    points: [4, 0, 0, 4, 0, 4, 60, 40, 0, 0, 100],
  },
  subjectType: 'Subject Type 1',
  department: 'IT - Information Technology',
  updateNo: 1,
  isElective: false,
  semNo: 1,
  listIndex: 1,
  isFreezed: false,
  crudInfo: {
    type: 'SUBJECT_CREATE',
    by: 'Script Manger User',
  },
};

const v3SubjectData = {
  subjectCode: 'VER 103',
  subjectName: 'VERSION DEMO 3',
  subjectShort: 'VER-3',
  headMasterJSON: {
    headMasters: [
      'Lecture',
      'Tutorial',
      'Practical',
      'L+T',
      'P',
      'Total CS',
      'Theory',
      'Sessional',
      'Practical',
      'Term Work',
      'Total ES',
    ],
    headGroups: ['Teaching Scheme', 'Credit Structure', 'Exam Scheme'],
    headGroupsLength: [3, 3, 5],
    points: [4, 0, 0, 4, 0, 4, 60, 40, 0, 0, 100],
  },
  subjectType: 'Subject Type 1',
  department: 'IT - Information Technology',
  updateNo: 2,
  isElective: false,
  semNo: 1,
  listIndex: 1,
  isFreezed: false,
  crudInfo: {
    type: 'SUBJECT_CREATE',
    by: 'Script Manger User',
  },
};

module.exports = insertDummyData;
