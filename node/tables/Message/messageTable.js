const { sequelize } = require("../../DataBaseConnection.js");
const { DataTypes } = require("sequelize");
const conversation = require("./conversationTable.js");
const message = sequelize.define(
  "message",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },

    conversationId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    sendRole:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    time: {
      type: DataTypes.BIGINT,
      defaultValue: () => Date.now(),
    },
  },
  {
    tableName: "message",
    timestamps: false,
  },
);
message.belongsTo(conversation, { foreignKey: "conversationId" });
conversation.hasMany(message, { foreignKey: "conversationId" });
module.exports = message;
