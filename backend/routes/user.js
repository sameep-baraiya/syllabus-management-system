const express = require('express');
const { protect } = require('../middleware/auth');
const router = express.Router();
const { getLoggedUsers } = require('../controllers/user');

router.route('/logged').get(protect, getLoggedUsers);

module.exports = router;
