const { sequelize } = require("../DataBaseConnection.js");
const dataType = require("sequelize/lib/data-types");
const activityTable = sequelize.define(
  "activity",
  {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: dataType.STRING,
      allowNull: false,
    },
    beginTime: {
      type: dataType.STRING,
      allowNull: false,
    },
    endTime: {
      type: dataType.STRING,
      allowNull: false,
    },
    address: {
      type: dataType.STRING,
      allowNull: false,
    },
    image: {
      type: dataType.STRING,
      allowNull: true,
      defaultValue: "",
    },
    maxNum: {
      type: dataType.INTEGER,
      allowNull: false,
    },
    organizer: {
      type: dataType.STRING,
      allowNull: false,
    },
    contact: {
      type: dataType.STRING,
      allowNull: false,
    },
    description: {
      type: dataType.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "activity",
    timestamps: false,
  },
);
module.exports = activityTable;
