const { sequelize } = require('../config/databaseInit');
const { DataTypes, Model } = require('sequelize');
const CRUDLog = require('./CRUDLog');
const { departmentArray } = require('../common/department');

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
      values: departmentArray,
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
                msg: `Subject ${subject.subjectName} Created`,
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
    },
  }
);

Subject.hasOne(Subject, { as: 'successor' });
Subject.hasOne(Subject, { as: 'predecessor' });

module.exports = Subject;
