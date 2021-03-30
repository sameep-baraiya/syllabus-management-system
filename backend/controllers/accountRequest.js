const AccountRequest = require('../models/AccountRequest');
const User = require('../models/User');

// @desc    Get account requests with User data
// @route   GET /api/v1/account-request
// @access  Private
exports.getAccountRequests = async (req, res, next) => {
  try {
    const accountRequests = await AccountRequest.findAll({
      include: [
        {
          model: User,
          attributes: {
            exclude: ['id', 'password', 'crudInfo'],
          },
        },
      ],
    });

    // console.log(accountRequests[0].toJSON());

    res.status(200).json({
      success: true,
      data: accountRequests.map((it) => it.toJSON()),
      // data: {},
    });
  } catch (err) {
    return next(err);
  }
};

// @desc    Update account requset
// @route   PUT /api/v1/account-request/:id
// @access  Private
exports.updateAccountRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isApproved, message } = req.body;

    const accountRequest = await AccountRequest.findByPk(id);

    if (!accountRequest) {
      return next(
        new ErrorResponse('Error: Aaccount request does not exist', 400)
      );
    }

    const user = await accountRequest.getUser();

    if (isApproved === true) {
      accountRequest.crudInfo = {
        type: 'ACCOUNT_REQUSET_DELETE',
        by: req.user.name,
      };
      await accountRequest.destroy();

      user.isApproved = true;
      user.crudInfo = {
        type: 'USER_UPDATE',
        by: req.user.name,
      };
      await user.save();
    } else if (isApproved === false) {
      accountRequest.responseMessage = message ? message : '';
      accountRequest.isReviewed = true;
      accountRequest.crudInfo = {
        type: 'ACCOUNT_REQUSET_UPDATE',
        by: req.user.name,
      };
      await accountRequest.save();
    } else {
      return next(
        new ErrorResponse('Error: Account Request: Bad request object', 400)
      );
    }

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    return next(err);
  }
};
