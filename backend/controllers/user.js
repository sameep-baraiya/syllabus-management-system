const User = require('../models/User');

// @desc    Get logged users
// @route   GET /api/v1/user/logged
// @access  Private
exports.getLoggedUsers = async (req, res, next) => {
  try {
    const mapKeys = [...req.app.get('LOGGED_USERS')];
    const users = [];
    for (let i = 0; i < mapKeys.length; i++) {
      const tempUser = await User.findByPk(mapKeys[i][1].id, {
        attributes: ['id', 'name', 'department'],
      });
      users.push({
        ...tempUser.toJSON(),
        at: mapKeys[i][1].at,
      });
    }

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    return next(err);
  }
};
