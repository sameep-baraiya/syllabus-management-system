const { sequelize } = require('../config/databaseInit');
const { DataTypes, Model } = require('sequelize');
const Course = require('./Course');
const CRUDLog = require('./CRUDLog');

class AcademicBatch extends Model {}

AcademicBatch.init(
  {
    academicBatchCode: {
      type: DataTypes.STRING(60),
      unique: true,
    },
    academicBatchDescription: {
      type: DataTypes.STRING,
    },
    academicBatchName: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    startYear: {
      type: DataTypes.STRING(4),
    },
    endYear: {
      type: DataTypes.STRING(4),
    },
    files: {
      type: DataTypes.JSON,
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
    modelName: 'AcademicBatch',
    tableName: 'AcademicBatch',
    timestamps: true,
    hooks: {
      afterCreate: async (ab, options) => {
        try {
          switch (ab.crudInfo.type) {
            case 'ACADEMIC_BATCH_CREATE':
              await CRUDLog.create({
                msg: `Academic Batch ${ab.academicBatchCode}: ${ab.academicBatchName} Created`,
                type: 'CREATE',
                model: 'Academic Batch',
                by: ab.crudInfo.by,
              });
              break;
            default:
              await CRUDLog.create({
                msg:
                  'Unexpected crudInfo Model Academic Batch, Opertaion Create',
              });
              break;
          }
        } catch (err) {
          console.error(err);
        }
      },
      afterUpdate: async (ab, options) => {
        try {
          switch (ab.crudInfo.type) {
            case 'ACADEMIC_BATCH_FILE_CREATE':
              await CRUDLog.create({
                msg: `Academic Batch ${ab.academicBatchCode}: ${ab.academicBatchName} file(s) created`,
                type: 'UPDATE',
                model: 'Academic Batch',
                by: ab.crudInfo.by,
              });
              break;
            case 'ACADEMIC_BATCH_UPDATE':
              await CRUDLog.create({
                msg: `Academic Batch ${ab.academicBatchCode}: ${ab.academicBatchName} Updated`,
                type: 'UPDATE',
                model: 'Academic Batch',
                by: ab.crudInfo.by,
              });
              break;
            default:
              await CRUDLog.create({
                msg:
                  'Unexpected crudInfo Model Academic Batch, Opertaion Update',
              });
              break;
          }
        } catch (err) {
          console.error(err);
        }
      },
      afterDestroy: async (ab, options) => {
        try {
          switch (ab.crudInfo.type) {
            case 'ACADEMIC_BATCH_DELETE':
              await CRUDLog.create({
                msg: `Academic Batch ${ab.academicBatchCode}: ${ab.academicBatchName} Deleted`,
                type: 'DELETE',
                model: 'Academic Batch',
                by: ab.crudInfo.by,
              });
              break;
            default:
              await CRUDLog.create({
                msg:
                  'Unexpected crudInfo Model Academic Batch, Opertaion Delete',
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

Course.hasMany(AcademicBatch);
AcademicBatch.belongsTo(Course);

module.exports = AcademicBatch;
