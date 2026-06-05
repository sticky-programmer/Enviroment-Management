const express = require("express");
const app = express();
const cors = require("cors");
const { sequelize } = require("./DataBaseConnection");
const router = require("./routes/index.js");
const userTable = require("./tables/userTable.js");
const garbageTable = require("./tables/garbageTable.js");
const activityTable = require("./tables/activityTable.js");
const checkinTable = require("./tables/checkinTable.js");
const user_activityTable = require("./tables/user_activityTable.js");
app.use(cors());
app.use(express.json());
app.use(router);

(async () => {
  await sequelize.authenticate();
  await userTable.sync();
  await garbageTable.sync();
  await activityTable.sync();
  await checkinTable.sync();
  await user_activityTable.sync();
  console.log("数据库连接成功");
  app.listen(3000, () => {
    console.log("server is running at http://localhost:3000");
  });
})();
module.exports = app;
