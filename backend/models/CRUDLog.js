const { sequelize } = require('../config/databaseInit');
const { DataTypes, Model } = require('sequelize');

class CRUDLog extends Model {}

CRUDLog.init(
  {
    msg: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    model: {
      type: DataTypes.STRING,
    },
    by: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: sequelize,
    modelName: 'CRUDLog',
    tableName: 'CRUDLog',
    timestamps: true,
  }
);

module.exports = CRUDLog;
