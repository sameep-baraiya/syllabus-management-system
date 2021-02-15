const { sequelize } = require('../config/databaseInit');
const { DataTypes, Model } = require('sequelize');

class Course extends Model {}

Course.init(
  {
    courseCode: {
      type: DataTypes.STRING(40),
      unique: true,
    },
    courseDescription: {
      type: DataTypes.STRING,
    },
    courseType: {
      type: DataTypes.ENUM,
      values: ['B.Tech', 'M.Tech'],
      allowNull: false,
    },
    department: {
      type: DataTypes.ENUM,
      values: [
        'CH - Chemical Engineering',
        'CI - Civil Engineering',
        'CE - Computer Engineering',
        'EC - Electronic Engineering',
        'ME - Mechanical Engineering',
        'IT - Information Technology',
      ],
      allowNull: false,
    },
    courseLength: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
    },
    noOfSemesters: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
    },
    isOutdated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    updateNo: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    modelName: 'Course',
    tableName: 'Course',
    timestamps: true,
  }
);

Course.hasOne(Course, { as: 'successor' });
Course.hasOne(Course, { as: 'predecessor' });

module.exports = Course;
