const { sequelize } = require('../config/databaseInit');
const { DataTypes, Model } = require('sequelize');

class BOSMeeting extends Model {}

BOSMeeting.init(
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
  },
  {
    sequelize: sequelize,
    modelName: 'BOSMeeting',
    tableName: 'BOSMeeting',
    timestamps: true,
  }
);

module.exports = BOSMeeting;
