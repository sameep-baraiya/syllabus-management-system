const express = require('express');
const router = express.Router();
const { getConfig } = require('../controllers/config');

router.route('/').get(getConfig);

module.exports = router;
