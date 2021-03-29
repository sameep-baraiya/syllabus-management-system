const dirTree = require('directory-tree');

// @desc    Get storage info
// @route   GET /api/v1/storage/info
// @access  Private
exports.getStorageInfo = async (req, res, next) => {
  try {
    const tree = dirTree('./uploads');

    tree.children.forEach((it) => {
      it.childrenLength = it.children.length;
      delete it.children;
    });

    const data = {
      tree,
    };

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    return next(err);
  }
};
