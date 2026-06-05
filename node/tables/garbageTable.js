const { sequelize } = require("../DataBaseConnection.js");
const dataType = require("sequelize/lib/data-types");
const garbageTable = sequelize.define(
  "garbage",
  {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: dataType.STRING,
      allowNull: false,
    },
    name: {
      type: dataType.STRING,
      allowNull: false,
    },
    image: {
      type: dataType.STRING,
      allowNull: true,
      defaultValue: "",
    },
    description: {
      type: dataType.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "garbage",
    timestamps: false,
  },
);
module.exports = garbageTable;
