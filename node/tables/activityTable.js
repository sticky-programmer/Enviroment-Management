const { sequelize } = require("../DataBaseConnection");
const { DataTypes } = require("sequelize");

const activityTable = sequelize.define(
  "activity",
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

    beginTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    maxNum: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    organizer: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    contact: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    scores: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "activity",
    timestamps: false,
  },
);

module.exports = activityTable;
