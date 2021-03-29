// @desc    Get crud records
// @route   GET /api/v1/crud-info
// @access  Private
exports.getCRUDRecords = async (req, res, next) => {
  try {
    res.status(200).json(res.advancedResults);
  } catch (err) {
    return next(err);
  }
};
