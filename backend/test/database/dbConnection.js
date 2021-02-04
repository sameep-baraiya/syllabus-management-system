const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

const sequelize = new Sequelize(
  process.env.DEV_DB,
  process.env.DEV_DB_USERNAME,
  process.env.DEV_DB_PASSWORD,
  {
    host: process.env.DEV_DB_HOST,
    dialect: process.env.DEV_DB_DIALECT,
  }
);

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

connect();
