const express = require('express');
const router = express.Router();
const {
  getLoggedUsers,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/user');

// Middleware
const { protect } = require('../middleware/auth');
const advancedResult = require('../middleware/advancedResult');

// User Model
const User = require('../models/User');

router.route('/logged').get(protect(['admin']), getLoggedUsers);
router
  .route('/')
  .get(
    protect(['admin']),
    advancedResult(User, ['name', 'email', 'contactNumber']),
    getUsers
  );

router
  .route('/:id')
  .get(protect(['admin']), getUser)
  .put(protect(['admin']), updateUser)
  .delete(protect(['admin']), deleteUser);

module.exports = router;
