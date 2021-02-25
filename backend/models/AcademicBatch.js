const { sequelize } = require('../config/databaseInit');
const { DataTypes, Model } = require('sequelize');

class AcademicBatch extends Model {}

AcademicBatch.init(
  {
    academicBatchCode: {
      type: DataTypes.STRING(40),
      unique: true,
    },
    academicBatchDescription: {
      type: DataTypes.STRING,
    },
    academicBatchName: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    yearLable: {
      type: DataTypes.STRING(9),
      allowNull: false,
    },
    coursesObj: {
      type: DataTypes.JSON,
    },
  },
  {
    sequelize: sequelize,
    modelName: 'AcademicBatch',
    tableName: 'AcademicBatch',
    timestamps: true,
  }
);

AcademicBatch.sync();

module.exports = AcademicBatch;
