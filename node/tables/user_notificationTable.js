const { sequelize } = require("../DataBaseConnection");
const { DataTypes } = require("sequelize");
const userTable = require("./userTable");
const notificationTable = require("./notificationTable");
const userNotificationTable = sequelize.define(
  "user_notification",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,

      allowNull: false,
    },
    notificationId: {
      type: DataTypes.INTEGER,

      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    readTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "user_notification",
    timestamps: false,
    indexes: [
      {
        unique: true,

        fields: ["userId", "notificationId"],
      },
      {
        fields: ["userId"],
      },
      {
        fields: ["isRead"],
      },
    ],
  },
);

/* relation */

userTable.hasMany(userNotificationTable, {
  foreignKey: "userId",
});

notificationTable.hasMany(userNotificationTable, {
  foreignKey: "notificationId",
});

userNotificationTable.belongsTo(userTable, {
  foreignKey: "userId",
});

userNotificationTable.belongsTo(notificationTable, {
  foreignKey: "notificationId",
});

module.exports = userNotificationTable;
