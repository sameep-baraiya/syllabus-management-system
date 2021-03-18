const { sequelize } = require('../config/databaseInit');
const { DataTypes, Model } = require('sequelize');
const CRUDLog = require('./CRUDLog');

class Course extends Model {}

Course.init(
  {
    courseCode: {
      type: DataTypes.STRING(60),
      unique: true,
    },
    courseName: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    courseDescription: {
      type: DataTypes.STRING,
    },
    courseType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    noOfSem: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
    },
    monthPerSem: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
    },
    isOutdated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    modelName: 'Course',
    tableName: 'Course',
    timestamps: true,
    hooks: {
      afterCreate: async (course, options) => {
        try {
          switch (course.crudInfo.type) {
            case 'COURSE_CREATE':
              await CRUDLog.create({
                msg: `Course ${course.courseCode}: ${course.courseName} Created`,
                type: 'CREATE',
                model: 'Course',
                by: course.crudInfo.by,
              });
              break;
            default:
              await CRUDLog.create({
                msg: 'Unexpected crudInfo Model Course, Opertaion Create',
              });
              break;
          }
        } catch (err) {
          console.error(err);
        }
      },
      afterUpdate: async (course, options) => {
        try {
          switch (course.crudInfo.type) {
            case 'COURSE_UPDATE':
              await CRUDLog.create({
                msg: `Course ${course.courseCode}: ${course.courseName} Updated`,
                type: 'UPDATE',
                model: 'Course',
                by: course.crudInfo.by,
              });
              break;
            default:
              await CRUDLog.create({
                msg: 'Unexpected crudInfo Model Course, Opertaion Update',
              });
              break;
          }
        } catch (err) {
          console.error(err);
        }
      },
      afterDestroy: async (course, options) => {
        try {
          switch (course.crudInfo.type) {
            case 'COURSE_DELETE':
              await CRUDLog.create({
                msg: `Course ${course.courseCode}: ${course.courseName} Deleted`,
                type: 'DELETE',
                model: 'Course',
                by: course.crudInfo.by,
              });
              break;
            default:
              await CRUDLog.create({
                msg: 'Unexpected crudInfo Model Course, Opertaion Delete',
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

module.exports = Course;
