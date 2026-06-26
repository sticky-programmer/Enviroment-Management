const express = require("express");
const notificationRouter = express.Router();
const Notification = require("../models/notification");
const UserNotification = require("../models/user_notification");
const notification = new Notification();
const userNotification = new UserNotification();
notificationRouter.post("/", async (req, res) => {
  const userId = req.query.userId;
  if (userId !== "all" && isNaN(Number(userId))) {
    res.status(400).json({ message: "参数错误" });
    return;
  }
  try {
    const notifications = await notification.createNotification(req.body);
    if (userId === "all") {
      res.send({ message: "暂时不允许广播，等待功能开放" });
      return;
    }
    await userNotification.createUserNotification(notifications, userId);
    res.send({ message: "创建成功" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "服务器错误，创建失败", error: error.message });
  }
});
module.exports = notificationRouter;
