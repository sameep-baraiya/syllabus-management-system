const { sequelize } = require('../config/databaseInit');
const { DataTypes, Model } = require('sequelize');
const CRUDLog = require('./CRUDLog');
const User = require('./User');

class AccountRequset extends Model {}

AccountRequset.init(
  {
    responseMessage: {
      type: DataTypes.STRING,
    },
    isReviewed: {
      type: DataTypes.BOOLEAN,
    },
    crudInfo: {
      type: DataTypes.JSON,
    },
  },
  {
    sequelize: sequelize,
    modelName: 'AccountRequset',
    tableName: 'AccountRequset',
    timestamps: true,
    hooks: {
      afterCreate: async (ar, options) => {
        try {
          switch (ar.crudInfo.type) {
            case 'ACCOUNT_REQUSET_CREATE':
              await CRUDLog.create({
                msg: `Account Requset created for user with name: ${ar.crudInfo.by}`,
                type: 'CREATE',
                model: 'Account Requset',
              });
              break;
            default:
              await CRUDLog.create({
                msg:
                  'Unexpected crudInfo Model Account Requset, Opertaion Create',
              });
              break;
          }
        } catch (err) {
          console.error(err);
        }
      },
      afterUpdate: async (ar, options) => {
        try {
          switch (ar.crudInfo.type) {
            case 'ACCOUNT_REQUSET_UPDATE':
              await CRUDLog.create({
                msg: `Account Requset updated for user with name: ${ar.crudInfo.by}`,
                type: 'UPDATE',
                model: 'Account Requset',
                by: ar.crudInfo.by,
              });
              break;
            default:
              await CRUDLog.create({
                msg:
                  'Unexpected crudInfo Model Account Requset, Opertaion Update',
              });
              break;
          }
        } catch (err) {
          console.error(err);
        }
      },
      afterDestroy: async (ar, options) => {
        try {
          switch (ar.crudInfo.type) {
            case 'ACCOUNT_REQUSET_DELETE':
              await CRUDLog.create({
                msg: `Account Requset deleted for user with name: ${ar.crudInfo.by}`,
                type: 'DELETE',
                model: 'Account Requset',
                by: ar.crudInfo.by,
              });
              break;
            default:
              await CRUDLog.create({
                msg:
                  'Unexpected crudInfo Model Account Requset, Opertaion Delete',
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

User.hasOne(AccountRequset);
AccountRequset.belongsTo(User);

module.exports = AccountRequset;
