const { sequelize } = require('../config/databaseInit');
const { DataTypes, Model } = require('sequelize');
const AcademicBatch = require('./AcademicBatch');
const Subject = require('./Subject');
const CRUDLog = require('./CRUDLog');

class AcademicBatchSubject extends Model {}

AcademicBatchSubject.init(
  {
    SubjectId: {
      type: DataTypes.INTEGER,
      references: {
        model: AcademicBatch,
        key: 'id',
      },
    },
    AcademicBatchId: {
      type: DataTypes.INTEGER,
      references: {
        model: Subject,
        key: 'id',
      },
    },
  },
  {
    sequelize: sequelize,
    modelName: 'AcademicBatchSubject',
    tableName: 'AcademicBatchSubject',
    timestamps: false,
    hooks: {
      afterBulkCreate: async (abs, options) => {
        try {
          await CRUDLog.create({
            msg: `Academic Batch Subject Bulk Create for AcademicBatchId: ${abs[0].AcademicBatchId}`,
            type: 'CREATE',
            model: 'Academic Batch Subject',
          });
        } catch (err) {
          console.error(err);
        }
      },
      afterBulkUpdate: async (options) => {
        try {
          await CRUDLog.create({
            msg: `Academic Batch Subject Bulk Updated`,
            type: 'UPDATE',
            model: 'Academic Batch Subject',
          });
        } catch (err) {
          console.error(err);
        }
      },
      afterBulkDestroy: async (options) => {
        try {
          await CRUDLog.create({
            msg: `Academic Batch Subject Bulk Deleted`,
            type: 'DELETE',
            model: 'Academic Batch Subject',
          });
        } catch (err) {
          console.error(err);
        }
      },
    },
  }
);

AcademicBatch.belongsToMany(Subject, {
  through: AcademicBatchSubject,
});
Subject.belongsToMany(AcademicBatch, {
  through: AcademicBatchSubject,
});

module.exports = AcademicBatchSubject;
