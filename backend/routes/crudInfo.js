const express = require('express');
const { protect } = require('../middleware/auth');
const CRUDLog = require('../models/CRUDLog');
const router = express.Router();
const { getCRUDRecords } = require('../controllers/crudInfo');
const advancedResult = require('../middleware/advancedResult');

router
  .route('/')
  .get(protect, advancedResult(CRUDLog, ['msg', 'by']), getCRUDRecords);

module.exports = router;
