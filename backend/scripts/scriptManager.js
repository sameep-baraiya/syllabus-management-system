console.log(`Running scriptManager in ${process.env.NODE_ENV} mode`);

// Setup readlin
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

// import scripts
const dropAllTables = require('./dropAllTables');
const insertDummyData = require('./insertDummyData');

const devSteps = `
1: Drop all tables from dev-database.
2: Insert dummy data in dev-database.
> `;

readline.question(devSteps, (no) => {
  console.log(`Excuting step ${no}`);
  switch (no) {
    case '1':
      dropAllTables();
      break;
    case '2':
      insertDummyData();
      break;
    default:
      console.log('default statment');
  }
  readline.close();
});
