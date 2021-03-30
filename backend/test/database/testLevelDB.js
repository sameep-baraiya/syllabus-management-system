const db = require('../../config/initLevelDB');

const testLevelDB = async () => {
  try {
    // await db.put('KEY', {
    //   boolKey: true,
    //   intKey: 0,
    //   stringKey: 'Test String',
    //   arrayKey: ['Test'],
    // });
    // const res = await db.get('KEY');
    // console.log(res);

    // await db.put('KEY', {
    //   testNewKey: 'Test',
    // });
    // const newRes = await db.get('KEY');
    // console.log(newRes);

    // await db.del('KEY');

    const departmentType = await db.get('DEPARTMENT_TYPE');
    const courseType = await db.get('COURSE_TYPE');
    const subjectType = await db.get('SUBJECT_TYPE');
    console.log(departmentType, courseType, subjectType);
  } catch (err) {
    console.error(err);
  }
};

testLevelDB();
