"use strict";
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    ssl: process.env.DB_SSL,
    dialectOptions: {
      ssl: {
        require: process.env.DB_SSL,
        rejectUnauthorized: false,
      },
    },
  }
);

const connectMysql = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Successful connection to MySQL ${process.env.DB_NAME}`);
  } catch (error) {
    console.error("Unable to connect to MySQL :", error);
    process.exit(1); //to stop Node.js process when error occures.  this code makes the process end with errorcode 1(it means the program finishes with error)
  }
};

connectMysql();

module.exports = {
  Sequelize: sequelize,
};
