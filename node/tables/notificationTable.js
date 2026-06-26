const { sequelize } = require("../DataBaseConnection");
const { DataTypes } = require("sequelize");
const activityTable = require("./activityTable");
const notificationTable = sequelize.define(
  "notification",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // 1活动 2系统 3积分 4审核
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    // 可为空
    activityId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // 1普通 2重要 3紧急
    priority: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    isTop: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    coverImage: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    createTime: {
      type: DataTypes.DATE,
      defaultValue: () => Date.now(),
    },
  },
  {
    tableName: "notification",
    timestamps: false,
  },
);
notificationTable.belongsTo(activityTable, {
  foreignKey: "activityId",
});
activityTable.hasMany(notificationTable, {
  foreignKey: "activityId",
});

module.exports = notificationTable;
