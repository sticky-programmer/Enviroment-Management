const { sequelize } = require("../DataBaseConnection");
const dataType = require("sequelize/lib/data-types");

const hobbyTable = sequelize.define(
  "hobby",
  {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: dataType.STRING(50),
      allowNull: false,
      unique: true,
    },

    description: {
      type: dataType.STRING(255),
      allowNull: true,
      defaultValue: "",
    },
  },
  {
    tableName: "hobby",
    timestamps: false,
  },
);

module.exports = hobbyTable;
