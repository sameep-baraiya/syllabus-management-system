const Cousre = require('../models/Course');

const courseWithSubject = async () => {
  try {
    const cousres = await Cousre.findAll();
    let result = 'Cousre::\n';
    for (let i = 0; i < cousres.length; i++) {
      result += cousres[i].toJSON().courseCode + ':\n';
      const subjects = await cousres[i].getSubjects();
      for (let j = 0; j < subjects.length; j++) {
        result += subjects[j].toJSON().subjectCode + '\n';
      }
    }
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

module.exports = courseWithSubject;
