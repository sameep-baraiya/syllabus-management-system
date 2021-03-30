const level = require('level');
const db = level('./database/level/db', { valueEncoding: 'json' });

module.exports = db;
