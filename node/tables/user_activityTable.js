const { sequelize } = require("../DataBaseConnection");
const { DataTypes } = require("sequelize");

const userTable = require("./userTable");
const activityTable = require("./activityTable");

const user_activityTable = sequelize.define(
  "user_activity",
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

    activityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },

    createTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    feedback: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: "user_activity",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["userId", "activityId"],
      },
    ],
  },
);

userTable.hasMany(user_activityTable, {
  foreignKey: "userId",
});

activityTable.hasMany(user_activityTable, {
  foreignKey: "activityId",
});

user_activityTable.belongsTo(userTable, {
  foreignKey: "userId",
});

user_activityTable.belongsTo(activityTable, {
  foreignKey: "activityId",
});

module.exports = user_activityTable;
