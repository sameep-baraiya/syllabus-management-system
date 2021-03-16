const { sequelize } = require('../config/databaseInit');
const { DataTypes, Model } = require('sequelize');
const CRUDLog = require('./CRUDLog');

class Subject extends Model {}

Subject.init(
  {
    subjectCode: {
      type: DataTypes.STRING(40),
      unique: true,
      allowNull: false,
    },
    subjectName: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    subjectShort: {
      type: DataTypes.STRING(10),
    },
    subjectType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subjectDescription: {
      type: DataTypes.STRING,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    headMasterJSON: {
      type: DataTypes.JSON,
    },
    theoryFile: {
      type: DataTypes.JSON,
    },
    isElective: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    practicalFile: {
      type: DataTypes.JSON,
    },
    semNo: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
    },
    listIndex: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
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
    isFreezed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    crudInfo: {
      type: DataTypes.JSON,
    },
  },
  {
    sequelize: sequelize,
    modelName: 'Subject',
    tableName: 'Subject',
    timestamps: true,
    hooks: {
      afterCreate: async (subject, options) => {
        try {
          switch (subject.crudInfo.type) {
            case 'SUBJECT_CREATE':
              await CRUDLog.create({
                msg: `Subject ${subject.subjectCode}: ${subject.subjectName} Created`,
                type: 'CREATE',
                model: 'Subject',
                by: subject.crudInfo.by,
              });
              break;
            default:
              await CRUDLog.create({
                msg: 'Unexpected crudInfo Model Subject, Opertaion Create',
              });
              break;
          }
        } catch (err) {
          console.error(err);
        }
      },
      afterUpdate: async (subject, options) => {
        try {
          switch (subject.crudInfo.type) {
            case 'SUBJECT_UPDATE_SUCCESSOR_PREDECESSOR':
              await CRUDLog.create({
                msg: `Subject ${subject.subjectCode}: ${subject.subjectName} Successor/Predecessor Updated`,
                type: 'UPDATE',
                model: 'Subject',
                by: subject.crudInfo.by,
              });
              break;
            case 'SUBJECT_UPDATE':
              await CRUDLog.create({
                msg: `Subject ${subject.subjectCode}: ${subject.subjectName} Updated`,
                type: 'UPDATE',
                model: 'Subject',
                by: subject.crudInfo.by,
              });
              break;
            default:
              await CRUDLog.create({
                msg: 'Unexpected crudInfo Model Subject, Opertaion Update',
              });
              break;
          }
        } catch (err) {
          console.error(err);
        }
      },
      afterDestroy: async (subject, options) => {
        try {
          switch (subject.crudInfo.type) {
            case 'SUBJECT_DELETE':
              await CRUDLog.create({
                msg: `Subject ${subject.subjectCode}: ${subject.subjectName} Deleted`,
                type: 'DELETE',
                model: 'Subject',
                by: subject.crudInfo.by,
              });
              break;
            default:
              await CRUDLog.create({
                msg: 'Unexpected crudInfo Model Subject, Opertaion Delete',
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

Subject.belongsTo(Subject, { as: 'successor' });
Subject.belongsTo(Subject, { as: 'predecessor' });

module.exports = Subject;
