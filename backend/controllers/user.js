const User = require('../models/User');
const ErrorResponse = require('../utils/ErrorResponse');

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

// @desc    Get users
// @route   GET /api/v1/user
// @access  Private
exports.getUsers = async (req, res, next) => {
  try {
    const userArr = res.advancedResults.data;
    userArr.forEach((it) => {
      delete it.password;
    });

    res.status(200).json(res.advancedResults);
  } catch (err) {
    return next(err);
  }
};

// @desc    Get user
// @route   GET /api/v1/user/:id
// @access  Private
exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: {
        exclude: ['password'],
      },
    });

    if (!user) {
      return next(new ErrorResponse('Error: User does not exist', 400));
    }

    res.status(200).json({
      success: true,
      data: user.toJSON(),
    });
  } catch (err) {
    return next(err);
  }
};

// @desc    Updated user (By Admin or By user self)
// @route   PUT /api/v1/user/:id
// @access  Private
exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return next(new ErrorResponse('Error: User does not exist', 400));
    }

    // TODO Fix when role access fixed
    // if (user.id === req.user.id) {

    // } else {
    const { role, department } = req.body;

    user.role = role;
    user.department = department;
    user.crudInfo = {
      type: 'USER_UPDATE',
      by: req.user.name,
    };
    await user.save();

    res.status(200).json({
      success: true,
    });
    // }
  } catch (err) {
    return next(err);
  }
};

// @desc    Delete User
// @route   DELETE /api/v1/user/:id
// @access  Private
exports.deleteUser = async (req, res, next) => {
  try {
    // TODO Fix this
    const { id } = req.params;
    const { password } = req.body;

    const ogUser = await User.findByPk(req.user.id);

    if (!ogUser.matchPassword(password)) {
      return next(new ErrorResponse('Passowrd not matched', 404));
    }

    const user = await User.findByPk(id);

    if (!user) {
      return next(new ErrorResponse('Error: User does not exist', 400));
    }

    user.crudInfo = {
      type: 'USER_DELETE',
      by: ogUser.name,
    };
    await user.destroy();

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    return next(err);
  }
};
