const express = require('express');
const router = express.Router();
const { getLoggedUsers, getUsers } = require('../controllers/user');

// Middleware
const { protect } = require('../middleware/auth');
const advancedResult = require('../middleware/advancedResult');

// User Model
const User = require('../models/User');

router.route('/logged').get(protect, getLoggedUsers);
router
  .route('/')
  .get(
    protect,
    advancedResult(User, ['name', 'email', 'contactNumber']),
    getUsers
  );

module.exports = router;
