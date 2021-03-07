const { sequelize } = require('../config/databaseInit');
const { DataTypes, Model } = require('sequelize');

class ACMeeting extends Model {}

ACMeeting.init(
  {
    meetingCode: {
      type: DataTypes.STRING(40),
    },
    meetingsNotes: {
      type: DataTypes.STRING,
    },
    dateOfMeeting: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    requestedChanges: {
      type: DataTypes.JSON,
    },
    // TODO Refactor department module
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
    files: {
      type: DataTypes.JSON,
    },
    noOfFiles: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
    subjectChanges: {
      type: DataTypes.JSON,
    },
  },
  {
    sequelize: sequelize,
    modelName: 'ACMeeting',
    tableName: 'ACMeeting',
    timestamps: true,
  }
);

module.exports = ACMeeting;
