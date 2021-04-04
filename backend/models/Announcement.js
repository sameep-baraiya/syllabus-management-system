const { sequelize } = require('../config/databaseInit');
const { DataTypes, Model } = require('sequelize');
const CRUDLog = require('./CRUDLog');

class Announcement extends Model {}

Announcement.init(
  {
    title: {
      type: DataTypes.STRING,
    },
    msg: {
      type: DataTypes.STRING,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    crudInfo: {
      type: DataTypes.JSON,
    },
  },
  {
    sequelize: sequelize,
    modelName: 'Announcement',
    tableName: 'Announcement',
    timestamps: true,
    hooks: {
      afterCreate: async (it, options) => {
        try {
          switch (it.crudInfo.type) {
            case 'ANNOUNCEMENT_CREATE':
              await CRUDLog.create({
                msg: `Announcement ${it.id} created by : ${it.crudInfo.by}`,
                type: 'CREATE',
                model: 'Announcement',
              });
              break;
            default:
              await CRUDLog.create({
                msg: 'Unexpected crudInfo Model Announcement, Opertaion Create',
              });
              break;
          }
        } catch (err) {
          console.error(err);
        }
      },
      afterUpdate: async (it, options) => {
        try {
          switch (it.crudInfo.type) {
            case 'ANNOUNCEMENT_UPDATE':
              await CRUDLog.create({
                msg: `Announcement ${it.id} updated by : ${it.crudInfo.by}`,
                type: 'UPDATE',
                model: 'Announcement',
                by: it.crudInfo.by,
              });
              break;
            default:
              await CRUDLog.create({
                msg: 'Unexpected crudInfo Model Announcement, Opertaion Update',
              });
              break;
          }
        } catch (err) {
          console.error(err);
        }
      },
      afterDestroy: async (it, options) => {
        try {
          switch (it.crudInfo.type) {
            case 'ANNOUNCEMENT_DELETE':
              await CRUDLog.create({
                msg: `Announcement ${it.id} deleted by : ${it.crudInfo.by}`,
                type: 'DELETE',
                model: 'Announcement',
                by: it.crudInfo.by,
              });
              break;
            default:
              await CRUDLog.create({
                msg: 'Unexpected crudInfo Model Announcement, Opertaion Delete',
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

module.exports = Announcement;
