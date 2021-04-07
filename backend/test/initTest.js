const fs = require('fs');
const colors = require('colors');
const dotenv = require('dotenv');

// Test #1 Check config.env exists
if (fs.existsSync('./config/config.env')) {
  console.log('PASS'.green, '#1 config.env exists');
} else {
  console.error('FAIL'.red, '#1 Error: config.env does not exists');
}

// Load env vars
dotenv.config({ path: './config/config.env' });

// Test #2 to #8 Check environment variable exists
if (process.env.NODE_ENV) {
  if (!process.env.JWT_SECRET) {
    console.error('FAIL'.red, '#2 Error: JWT_SECRET does not exist');
  } else {
    console.log('PASS'.green, '#2 JWT_SECRET does exist');
  }
  if (!process.env.JWT_EXPIRE) {
    console.error('FAIL'.red, '#3 Error: JWT_EXPIRE does not exist');
  } else {
    console.log('PASS'.green, '#3 JWT_EXPIRE does exist');
  }

  if (process.env.NODE_ENV === 'development') {
    if (!process.env.DEV_DB) {
      console.error('FAIL'.red, '#4 Error: DEV_DB does not exist');
    } else {
      console.log('PASS'.green, '#4 DEV_DB does exist');
    }
    if (!process.env.DEV_DB_USERNAME) {
      console.error('FAIL'.red, '#5 Error: DEV_DB_USERNAME does not exist');
    } else {
      console.log('PASS'.green, '#5 DEV_DB_USERNAME does exist');
    }
    if (!process.env.DEV_DB_PASSWORD) {
      console.error('FAIL'.red, '#6 Error: DEV_DB_PASSWORD does not exist');
    } else {
      console.log('PASS'.green, '#6 DEV_DB_PASSWORD does exist');
    }
    if (!process.env.DEV_DB_HOST) {
      console.error('FAIL'.red, '#7 Error: DEV_DB_HOST does not exist');
    } else {
      console.log('PASS'.green, '#7 DEV_DB_HOST does exist');
    }
    if (!process.env.DEV_DB_DIALECT) {
      console.error('FAIL'.red, '#8 Error: DEV_DB_DIALECT does not exist');
    } else {
      console.log('PASS'.green, '#8 DEV_DB_DIALECT does exist');
    }
  } else if (process.env.NODE_ENV === 'production') {
    if (!process.env.PROD_DB) {
      console.error('FAIL'.red, '#4 Error: PROD_DB does not exist');
    } else {
      console.log('PASS'.green, '#4 PROD_DB does exist');
    }
    if (!process.env.PROD_DB_USERNAME) {
      console.error('FAIL'.red, '#5 Error: PROD_DB_USERNAME does not exist');
    } else {
      console.log('PASS'.green, '#5 PROD_DB_USERNAME does exist');
    }
    if (!process.env.PROD_DB_PASSWORD) {
      console.error('FAIL'.red, '#6 Error: PROD_DB_PASSWORD does not exist');
    } else {
      console.log('PASS'.green, '#6 PROD_DB_PASSWORD does exist');
    }
    if (!process.env.PROD_DB_HOST) {
      console.error('FAIL'.red, '#7 Error: PROD_DB_HOST does not exist');
    } else {
      console.log('PASS'.green, '#7 PROD_DB_HOST does exist');
    }
    if (!process.env.PROD_DB_DIALECT) {
      console.error('FAIL'.red, '#8 Error: PROD_DB_DIALECT does not exist');
    } else {
      console.log('PASS'.green, '#8 PROD_DB_DIALECT does exist');
    }
  } else {
    console.error('FAIL'.red, '#2 Error: Unexpected NODE_ENV value');
  }
} else {
  console.error('FAIL'.red, '#2 Error: NODE_ENV does not exists');
}

// Loading database
const { sequelize } = require('../config/databaseInit');

// Test #9 Check databased connection
if (sequelize) {
  console.log('PASS'.green, '#9 Databased connected');
} else {
  console.error('FAIL'.red, '#9 Error: Unable to connect with database');
}

// Test #10 Check upload Folder Exists
if (fs.existsSync('./uploads')) {
  console.log('PASS'.green, '#10 Uploads folder exists');
} else {
  console.error('FAIL'.red, '#10 Error: Uploads folder does not exists');
}

// Test #11 Check temp Folder Exists
if (fs.existsSync('./temp')) {
  console.log('PASS'.green, '#11 Temp folder exists');
} else {
  console.error('FAIL'.red, '#11 Error: Temp folder does not exists');
}

// Test #12 Check uploads/academic-batch Folder Exists
if (fs.existsSync('./uploads/academic-batch')) {
  console.log('PASS'.green, '#12 uploads/academic-batch folder exists');
} else {
  console.error(
    'FAIL'.red,
    '#12 Error: uploads/academic-batch folder does not exists'
  );
}

const db = require('../config/initLevelDB');

// Test #13 Check Level DB exists
if (db) {
  console.log('PASS'.green, '#13 Level DB exists');
} else {
  console.error('FAIL'.red, '#13 Error: Level DB does not exists');
}

// Test #14 Check Level DB initialized
const testLevelDB = async () => {
  try {
    const departmentType = await db.get('DEPARTMENT_TYPE');
    const courseType = await db.get('COURSE_TYPE');
    const subjectType = await db.get('SUBJECT_TYPE');
    if (departmentType && courseType && subjectType) {
      console.log('PASS'.green, '#14 Level DB initialized properly');
    }
  } catch (err) {
    console.error(
      'FAIL'.red,
      '#14 Error: Level DB does not properly initialized',
      err
    );
  }
};

testLevelDB();

// Test #14 Check Database models exists
const User = require('../models/User');
const Cousre = require('../models/Course');
const Subject = require('../models/Subject');
const AcademicBatchSubject = require('../models/AcademicBatchSubject');
const AcademicBatch = require('../models/AcademicBatch');
const Meeting = require('../models/Meeting');
const CRUDLog = require('../models/CRUDLog');
const Announcement = require('../models/Announcement');

const testModelExists = async () => {
  try {
    await User.findAll({
      limit: 0,
    });
    await Cousre.findAll({
      limit: 0,
    });
    await Subject.findAll({
      limit: 0,
    });
    await AcademicBatchSubject.findAll({
      limit: 0,
    });
    await AcademicBatch.findAll({
      limit: 0,
    });
    await Meeting.findAll({
      limit: 0,
    });
    await CRUDLog.findAll({
      limit: 0,
    });
    await Announcement.findAll({
      limit: 0,
    });
    console.log('PASS'.green, '#15 Database models exists properly');
  } catch (err) {
    console.error(
      'FAIL'.red,
      '#15 Error: Database models does not exists properly',
      err
    );
  }
};

testModelExists();
