const { sequelize } = require("../DataBaseConnection");
const dataType = require("sequelize/lib/data-types");

const userHobbyTable = sequelize.define(
  "user_hobby",
  {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: dataType.INTEGER,
      allowNull: false,
      primaryKey: true,
    },

    hobbyId: {
      type: dataType.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    tableName: "user_hobby",
    timestamps: false,
  }
);

module.exports = userHobbyTable;