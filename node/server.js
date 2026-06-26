require("dotenv").config({
  path: "./.env.development",
});
const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const controllWebSocket = require("./controllWebSocket.js");
const cors = require("cors");
const { sequelize } = require("./DataBaseConnection");
const router = require("./routes/index.js");
const { DataTypes } = require("sequelize");
const { FORCE } = require("sequelize/lib/index-hints");
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
controllWebSocket(io);
(async () => {
  try {
    await sequelize.authenticate();
    console.log("数据库连接成功");
    console.log(
      new Date().toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    );
    server.listen(3000, () => {
      console.log("server is running at http://localhost:3000");
    });
  } catch (err) {
    console.log(err);
    return;
  }
})();
module.exports = app;
