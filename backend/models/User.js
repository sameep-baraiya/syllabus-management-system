const { sequelize } = require('../config/databaseInit');
const { DataTypes, Model } = require('sequelize');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CRUDLog = require('./CRUDLog');

class User extends Model {
  getSignedJwtToken() {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  }
  matchPassword(enteredPassword) {
    return bcryptjs.compareSync(enteredPassword, this.password);
  }
}
User.init(
  {
    name: {
      type: DataTypes.STRING(51),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    contactNumber: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ['admin', 'faculty-member', 'syllabus-manager'],
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(60),
      set(value) {
        const encryptedPassword = encryptPassword(value);
        this.setDataValue('password', encryptedPassword);
      },
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    crudInfo: {
      type: DataTypes.JSON,
    },
  },
  {
    sequelize: sequelize,
    modelName: 'User',
    tableName: 'User',
    timestamps: true,
    hooks: {
      afterCreate: async (user, options) => {
        try {
          switch (user.crudInfo.type) {
            case 'USER_CREATE':
              await CRUDLog.create({
                msg: `User ${user.name} Created`,
                type: 'CREATE',
                model: 'User',
                by: user.crudInfo.by && user.crudInfo.by,
              });
              break;
            default:
              await CRUDLog.create({
                msg: 'Unexpected crudInfo Model User, Opertaion Create',
              });
              break;
          }
        } catch (err) {
          console.error(err);
          throw err;
        }
      },
      afterUpdate: async (user, options) => {
        try {
          switch (user.crudInfo.type) {
            case 'USER_UPDATE':
              await CRUDLog.create({
                msg: `User ${user.name} Updated`,
                type: 'UPDATE',
                model: 'User',
                by: user.crudInfo.by,
              });
              break;
            default:
              await CRUDLog.create({
                msg: 'Unexpected crudInfo Model User, Opertaion Update',
              });
              break;
          }
        } catch (err) {
          console.error(err);
          throw err;
        }
      },
      afterDestroy: async (user, options) => {
        try {
          switch (user.crudInfo.type) {
            case 'USER_DELETE':
              await CRUDLog.create({
                msg: `User ${user.name} Deleted`,
                type: 'DELETE',
                model: 'User',
                by: user.crudInfo.by,
              });
              break;
            default:
              await CRUDLog.create({
                msg: 'Unexpected crudInfo Model User, Opertaion Delete',
              });
              break;
          }
        } catch (err) {
          console.error(err);
          throw err;
        }
      },
    },
  }
);

const encryptPassword = (password) => {
  const salt = bcryptjs.genSaltSync(10);
  const encryptedPassword = bcryptjs.hashSync(password, salt);
  return encryptedPassword;
};

module.exports = User;
