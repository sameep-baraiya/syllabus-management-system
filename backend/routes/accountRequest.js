const express = require('express');
const { protect } = require('../middleware/auth');
const router = express.Router();
const {
  getAccountRequests,
  updateAccountRequest,
} = require('../controllers/accountRequest');

router.route('/').get(protect, getAccountRequests);
router.route('/:id').put(protect, updateAccountRequest);

module.exports = router;
