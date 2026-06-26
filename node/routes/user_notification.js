const express = require("express");
const user_notificationRouter = express.Router();
const UserNotification = require("../models/user_notification");
const userNotification = new UserNotification();
user_notificationRouter.get("/:id", async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const notifications = await userNotification.getUserNotifications(userId);
        res.send(notifications);  
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
user_notificationRouter.put("/markAsRead/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        await userNotification.markAsRead(id);
        res.send({ message: "标记已读成功" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = user_notificationRouter;