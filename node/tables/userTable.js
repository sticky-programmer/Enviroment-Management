const { sequelize } = require("../DataBaseConnection");
const dataType = require("sequelize/lib/data-types");
const userTable = sequelize.define(
  "user",
  {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: dataType.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: dataType.STRING,
      allowNull: false,
    },
    createTime: {
      type: dataType.DATE,
      allowNull: true,
      defaultValue: sequelize.NOW,
    },
    status: {
      type: dataType.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    avatar: {
      type: dataType.STRING,
      allowNull: true,
      defaultValue: "",
    },
    checkScores: {
      type: dataType.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    nickname: {
      type: dataType.STRING,
      allowNull: true,
      defaultValue: "普通用户",
    },
    email: {
      type: dataType.STRING,
      allowNull: true,
      defaultValue: "",
    },
    phone: {
      type: dataType.STRING,
      allowNull: true,
      defaultValue: "",
    },
  },
  {
    tableName: "user",
    timestamps: false,
  },
);
module.exports = userTable;
