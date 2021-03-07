const { sequelize } = require('../config/databaseInit');
const { DataTypes, Model } = require('sequelize');
const Course = require('./Course');

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
  },
  {
    sequelize: sequelize,
    modelName: 'AcademicBatch',
    tableName: 'AcademicBatch',
    timestamps: true,
  }
);

Course.hasMany(AcademicBatch);
AcademicBatch.belongsTo(Course);

module.exports = AcademicBatch;
