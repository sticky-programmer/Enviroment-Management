const { sequelize } = require("../DataBaseConnection");
const {DataTypes}=require("sequelize");
const userTable = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.NOW,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    checkScores: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "普通用户",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    signature: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: "",
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    tableName: "user",
    timestamps: false,
  },
);
module.exports = userTable;
