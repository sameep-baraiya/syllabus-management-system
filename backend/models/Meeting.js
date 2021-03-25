const { sequelize } = require('../config/databaseInit');
const { DataTypes, Model } = require('sequelize');
const CRUDLog = require('./CRUDLog');

class Meeting extends Model {}

Meeting.init(
  {
    meetingCode: {
      type: DataTypes.STRING(60),
    },
    meetingsNotes: {
      type: DataTypes.STRING,
    },
    dateOfMeeting: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    meetingType: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    requestedChanges: {
      type: DataTypes.JSON,
    },
    files: {
      type: DataTypes.JSON,
    },
    noOfFiles: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
    isFreezed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    relationObject: {
      type: DataTypes.JSON,
    },
    crudInfo: {
      type: DataTypes.JSON,
    },
  },
  {
    sequelize: sequelize,
    modelName: 'Meeting',
    tableName: 'Meeting',
    timestamps: true,
    hooks: {
      afterCreate: async (meeting, options) => {
        try {
          switch (meeting.crudInfo.type) {
            case 'MEETING_CREATE':
              await CRUDLog.create({
                msg: `Meeting ${meeting.meetingCode} Created`,
                type: 'CREATE',
                model: 'Meeting',
                by: meeting.crudInfo.by,
              });
              break;
            default:
              await CRUDLog.create({
                msg: 'Unexpected crudInfo Model meeting, Opertaion Create',
              });
              break;
          }
        } catch (err) {
          console.error(err);
        }
      },
      afterUpdate: async (meeting, options) => {
        try {
          switch (meeting.crudInfo.type) {
            case 'MEETING_UPDATE':
              await CRUDLog.create({
                msg: `Meeting ${meeting.meetingCode} Updated`,
                type: 'UPDATE',
                model: 'Meeting',
                by: meeting.crudInfo.by,
              });
              break;
            default:
              await CRUDLog.create({
                msg: 'Unexpected crudInfo Model meeting, Opertaion Update',
              });
              break;
          }
        } catch (err) {
          console.error(err);
        }
      },
      afterDestroy: async (meeting, options) => {
        try {
          switch (meeting.crudInfo.type) {
            case 'MEETING_DELETE':
              await CRUDLog.create({
                msg: `Meeting ${meeting.meetingCode} Deleted`,
                type: 'DELETE',
                model: 'Meeting',
                by: meeting.crudInfo.by,
              });
              break;
            default:
              await CRUDLog.create({
                msg: 'Unexpected crudInfo Model meeting, Opertaion Delete',
              });
              break;
          }
        } catch (err) {
          console.error(err);
        }
      },
    },
  }
);

module.exports = Meeting;
