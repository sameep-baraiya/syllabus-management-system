const { sequelize } = require('../config/databaseInit');
const { DataTypes, Model } = require('sequelize');

class Subject extends Model {}

Subject.init(
  {
    subjectCode: {
      type: DataTypes.STRING(40),
      unique: true,
    },
    subjectName: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    subjectShort: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    subjectDescription: {
      type: DataTypes.STRING,
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
    headMasterJSON: {
      type: DataTypes.JSON,
    },
    theory: {
      type: DataTypes.TEXT,
    },
    isElective: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    practical: {
      type: DataTypes.TEXT,
    },
    files: {
      type: DataTypes.JSON,
    },
    noOfFiles: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
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
    modelName: 'Subject',
    tableName: 'Subject',
    timestamps: true,
  }
);

Subject.hasOne(Subject, { as: 'successor' });
Subject.hasOne(Subject, { as: 'predecessor' });

module.exports = Subject;
