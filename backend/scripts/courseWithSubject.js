const User = require('../models/User');
const Cousre = require('../models/Course');
const Subject = require('../models/Subject');
const CourseSubject = require('../models/CourseSubject');

const courseWithSubject = async () => {
  try {
    // const cousres = await Cousre.findAll();
    // console.log('Cousre:');
    // cousres.forEach((it) => {
    //   console.log(it.toJSON());
    // });
    // const subjects = await cousres[0].getSubjects();
    // subjects.forEach((it) => {
    //   console.log(it.toJSON());
    // });

    const cousres = await Cousre.findAll();
    let result = 'Cousre::\n';
    for (let i = 0; i < cousres.length; i++) {
      result += cousres[i].toJSON().courseCode + ':\n';
      const subjects = await cousres[i].getSubjects();
      for (let j = 0; j < subjects.length; j++) {
        result += subjects[j].toJSON().subjectCode + '\n';
      }
    }
    console.log(result, '----------');

    const subjects2 = await Subject.findAll();
    result = 'Subject::\n';
    for (let i = 0; i < subjects2.length; i++) {
      result += subjects2[i].toJSON().subjectCode + ':\n';
      const courses2 = await subjects2[i].getCourses();
      for (let j = 0; j < courses2.length; j++) {
        result += courses2[j].toJSON().courseCode + '\n';
      }
    }
    console.log(result, '----------');

    // const test = await Cousre.findAll();
    // const testS = await test[0].getSubjects({ where: { id: 2 } });
    // // testS.CourseSubject.semNo = 5;
    // console.log(testS[0].CourseSubject);
    // const courseSubject = testS[0].CourseSubject;
    // courseSubject.semNo = 5;
    // courseSubject.save();
  } catch (err) {
    console.error(err);
  }
};

module.exports = courseWithSubject;
