const { Op } = require('sequelize');
const ErrorResponse = require('../utils/ErrorResponse');
const advancedResult = (Model, searchFields = []) => async (req, res, next) => {
  try {
    console.log(req.query);
    const query = { ...req.query };

    // Field to exculde
    const removeFields = [
      'select',
      'sort',
      'page',
      'limit',
      'sortBy',
      'search',
    ];
    removeFields.forEach((param) => delete query[param]);

    // Check the mentioned attributes in the request query matched with model’s attributes.
    let attributesCheck = false;
    let attributes = undefined;
    if (req.query.select !== undefined) {
      attributes = req.query.select.split(',');
      const modelKeys = Object.keys(Model.rawAttributes);
      attributesCheck = attributes.every((it) => modelKeys.includes(it));
    }
    let sortyByCheck = false;

    // Check the mentioned 'where clause' in the request query matched with the model's attributes.
    let reqQuery = {};
    for (let key in Model.rawAttributes) {
      if (req.query[key] !== undefined) {
        reqQuery[key] = req.query[key];
        if (Model.rawAttributes[key].type.key === 'BOOLEAN') {
          reqQuery[key] = req.query[key] === 'true' ? true : false;
        }
        delete query[key];
      }
      // Check the mentioned 'sortBy' in the request query matched with the model's attributes.
      if (req.query.sortBy !== undefined) {
        if (req.query.sortBy === key) {
          sortyByCheck = true;
        }
      }
    }
    if (
      Object.keys(query).length !== 0 ||
      (req.query.sortBy && !sortyByCheck) ||
      (req.query.select && !attributesCheck)
    ) {
      return next(new ErrorResponse('Error: Bad request query', 400));
    }

    const limit = parseInt(req.query.limit, 10) || 5;
    const offset = parseInt(req.query.page, 10) * limit || 0;
    const order = [
      [
        `${sortyByCheck ? req.query.sortBy : 'id'}`,
        `${req.query.sort || 'ASC'}`,
      ],
    ];

    if (req.query.search !== undefined) {
      const searchQuery = req.query.search;
      const searchQueryObj = {};
      searchFields.forEach((field) => {
        searchQueryObj[field] = {
          [Op.like]: '%' + searchQuery + '%',
        };
      });
      reqQuery = {
        [Op.and]: {
          [Op.and]: {
            ...reqQuery,
          },
          [Op.or]: {
            ...searchQueryObj,
          },
        },
      };
    }

    const { rows, count } = await Model.findAndCountAll({
      where: reqQuery,
      limit,
      offset,
      order,
      attributes: req.query.select && req.query.select.split(','),
    });

    // page start from 0
    const pagination = {};

    console.log(offset, count);
    if (count - offset > limit) {
      pagination.next = {
        page: offset / limit + 1,
        limit,
      };
    }

    if (offset > 0) {
      pagination.prev = {
        page: offset / limit - 1,
        limit,
      };
    }
    pagination.current = {
      page: offset / limit,
      limit,
    };

    res.advancedResults = {
      success: true,
      total: count,
      pagination,
      data: rows.map((it) => it.toJSON()),
    };
    next();
  } catch (err) {
    return next(err);
  }
};

module.exports = advancedResult;
