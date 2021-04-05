const express = require('express');
const { protect } = require('../middleware/auth');
const router = express.Router();
const {
  getAccountRequests,
  updateAccountRequest,
} = require('../controllers/accountRequest');

router.route('/').get(protect(['admin']), getAccountRequests);
router.route('/:id').put(protect(['admin']), updateAccountRequest);

module.exports = router;
