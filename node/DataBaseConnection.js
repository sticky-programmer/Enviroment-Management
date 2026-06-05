const Sequelize = require("sequelize");
const dataType = require("sequelize/lib/data-types");
const sequelize = new Sequelize("environment_protection", "Wu", "123456", {
  host: "8.137.192.209",
  dialect: "mysql",
  timezone: "+08:00",
});
module.exports = { sequelize };
