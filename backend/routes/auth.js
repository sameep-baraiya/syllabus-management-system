const express = require('express');
const { register, login, getLoggedInUser } = require('../controllers/auth');
const { registerVal, loginVal } = require('../validators/auth');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/register').post(registerVal, register);
router.route('/login').post(loginVal, login);
router.route('/').get(protect, getLoggedInUser);
// router.route('/logout').get(logout);

module.exports = router;
