const {sequelize} = require("../DataBaseConnection");
const DataTypes = require("sequelize");
const userTable = require("./userTable");
const activityTable = require("./activityTable");

const user_activityTable = sequelize.define("user_activity", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
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
  }
}, {
  tableName: "user_activity",
  timestamps: false,
});
userTable.hasMany(user_activityTable, {
  foreignKey: "userId",
  targetKey: "id",
});
activityTable.hasMany(user_activityTable, {
  foreignKey: "activityId",
  targetKey: "id",
});
user_activityTable.belongsTo(userTable, {
  foreignKey: "userId",
  targetKey: "id",
});
user_activityTable.belongsTo(activityTable, {
  foreignKey: "activityId",
  targetKey: "id",
});
user_activityTable.sync({force: false});
module.exports = user_activityTable;