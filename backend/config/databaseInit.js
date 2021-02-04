const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

/**
 * @type Sequelize
 */
let sequelize = null;
try {
  if (process.env.NODE_ENV === 'development') {
    sequelize = new Sequelize(
      process.env.DEV_DB,
      process.env.DEV_DB_USERNAME,
      process.env.DEV_DB_PASSWORD,
      {
        host: process.env.DEV_DB_HOST,
        dialect: process.env.DEV_DB_DIALECT,
      }
    );
    try {
      // await sequelize.authenticate();
      console.log('Connection has been established successfully (DEV_DB)');
    } catch (error) {
      sequelize = null;
      console.error('Error: Unable to connect to the database');
      throw error;
    }
  } else if (process.env.NODE_ENV === 'production') {
    sequelize = new Sequelize(
      process.env.PROD_DB,
      process.env.PROD_DB_USERNAME,
      process.env.PROD_DB_PASSWORD,
      {
        host: process.env.PROD_DB_HOST,
        dialect: process.env.PROD_DB_DIALECT,
      }
    );
    try {
      // await sequelize.authenticate();
      console.log('Connection has been established successfully (PROD_DB)');
    } catch (error) {
      sequelize = null;
      console.error('Error: Unable to connect to the database');
      throw error;
    }
  } else {
    console.log('Error: In environment variables'.red.inverse);
  }
} catch (err) {
  console.error(err);
}

module.exports = {
  sequelize,
};
