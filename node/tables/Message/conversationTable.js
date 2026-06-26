const { sequelize } = require("../../DataBaseConnection");
const { DataTypes } = require("sequelize");
const userTable=require("../userTable");
const adminTable=require("../Admin/adminTable");
const conversation = sequelize.define(
  "conversation",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    userId:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    adminId:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    UserUnreadCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    AdminUnreadCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    lastMessageTime: {
      type: DataTypes.BIGINT,
      defaultValue: () => Date.now(),
    },
  },
  {
    tableName: "conversation",
    timestamps: false,
  },
);
conversation.belongsTo(userTable,{foreignKey:'userId'});
userTable.hasMany(conversation,{foreignKey:'userId'});
conversation.belongsTo(adminTable,{foreignKey:'adminId'});
adminTable.hasMany(conversation,{foreignKey:'adminId'});
module.exports = conversation;
