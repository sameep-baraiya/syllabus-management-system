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
const modelSync = require('./modelSync');
const modelSyncForced = require('./modelSyncForced');

const devSteps = `
0: ModelSyncForced (drop->create) from dev-database.
1: Drop all tables from dev-database.
2: Sync(Create if not exist) all tables from dev-database.
3: Insert dummy data in dev-database.
4: Show all tables data from dev-database.
5: Show all course with related subject's subject code from dev-database.
> `;

const readQuestion = async () => {
  console.log(
    `Running scriptManager in ${process.env.NODE_ENV} mode`.green.inverse
  );
  readline.question(devSteps, (no) => {
    console.log(`Excuting step ${no}`.green.inverse);
    switch (no) {
      case '0':
        modelSyncForced();
        break;
      case '1':
        dropAllTables();
        break;
      case '2':
        modelSync();
        break;
      case '3':
        insertDummyData();
        break;
      case '4':
        showAllTables();
        break;
      case '5':
        courseWithSubject();
        break;
      default:
        console.log('default statment');
    }
    readline.close();
  });
};

readQuestion();
