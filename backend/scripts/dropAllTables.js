const dropAllTable = async () => {
  try {
    const User = require('../models/User');
    User.drop();
    console.log('User table dropped!');
  } catch (err) {
    console.error(err);
  }
};

module.exports = dropAllTable;
