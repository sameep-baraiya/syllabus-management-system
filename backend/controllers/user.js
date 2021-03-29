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

      const index = users.map((it) => it.id).indexOf(tempUser.id);
      if (index !== -1) {
        users[index].noOfDevices += 1;
      } else {
        users.push({
          ...tempUser.toJSON(),
          at: mapKeys[i][1].at,
          noOfDevices: 1,
        });
      }
    }

    // console.log(users);

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    return next(err);
  }
};
