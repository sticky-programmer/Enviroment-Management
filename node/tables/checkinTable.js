const { sequelize } = require("../DataBaseConnection");
const dataType = require("sequelize/lib/data-types");
const userTable = require("./userTable.js");
const checkinTable = sequelize.define(
  "checkin",
  {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: dataType.INTEGER,
      allowNull: false,
    },
    photo: {
      type: dataType.STRING,
      allowNull: true,
      defaultValue: "",
    },
    checkinType: {
      type: dataType.STRING,
      allowNull: false,
    },
    checkinTime: {
      type: dataType.DATE,
      allowNull: false,
    },
    status: {
      type: dataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    checkinContent: {
      type: dataType.STRING,
      allowNull: true,
      defaultValue: "",
    },
  },
  {
    tableName: "checkin",
    timestamps: false,
  },
);
checkinTable.belongsTo(userTable, { foreignKey: "userId" });
userTable.hasMany(checkinTable, { foreignKey: "userId" });
module.exports = checkinTable;
