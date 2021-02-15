const { sequelize } = require('../config/databaseInit');
const { DataTypes, Model } = require('sequelize');
const Course = require('./Course');
const Subject = require('./Subject');

class CourseSubject extends Model {}

CourseSubject.init(
  {
    SubjectId: {
      type: DataTypes.INTEGER,
      references: {
        model: Course,
        key: 'id',
      },
    },
    CourseId: {
      type: DataTypes.INTEGER,
      references: {
        model: Subject,
        key: 'id',
      },
    },
    semNo: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
  },
  {
    sequelize: sequelize,
    modelName: 'CourseSubject',
    tableName: 'CourseSubject',
    timestamps: true,
  }
);

const initCourseAndSubjectModel = async () => {
  try {
    Course.belongsToMany(Subject, {
      through: CourseSubject,
    });
    Subject.belongsToMany(Course, {
      through: CourseSubject,
    });

    await Subject.sync();
    await Course.sync();
    await CourseSubject.sync();
  } catch (err) {
    console.error(err);
  }
};

initCourseAndSubjectModel();

module.exports = CourseSubject;
