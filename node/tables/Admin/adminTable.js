const { sequelize } = require("../../DataBaseConnection.js");
const { DataTypes } = require("sequelize");

const Admin = sequelize.define(
  "admin",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      comment: "管理员账号",
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "管理员密码",
    },

    createTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "创建时间",
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
      defaultValue: "admin",
    },
    online: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "是否在线",
    },
  },
  {
    tableName: "admin",
    timestamps: false,
  },
);

module.exports = Admin;
