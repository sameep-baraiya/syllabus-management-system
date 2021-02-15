const User = require('../models/User');
const Cousre = require('../models/Course');
const Subject = require('../models/Subject');
const CourseSubject = require('../models/CourseSubject');
const colors = require('colors');

// Setup readline
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

// import scripts
const dropAllTables = require('./dropAllTables');
const insertDummyData = require('./insertDummyData');
const showAllTables = require('./showAllTables');
const courseWithSubject = require('./courseWithSubject');

const devSteps = `
1: Drop all tables from dev-database.
2: Insert dummy data in dev-database.
3: Show all tables data from dev-database.
4: Show all course with related subject from dev-database.
> `;

// TODO Rework
const readQuestion = async () => {
  console.log(
    `Running scriptManager in ${process.env.NODE_ENV} mode`.green.inverse
  );
  readline.question(devSteps, (no) => {
    console.log(`Excuting step ${no}`.green.inverse);
    switch (no) {
      case '1':
        dropAllTables();
        break;
      case '2':
        insertDummyData();
        break;
      case '3':
        showAllTables();
        break;
      case '4':
        courseWithSubject();
        break;
      default:
        console.log('default statment');
    }
    readline.close();
  });
};

setTimeout(readQuestion, 2000);
