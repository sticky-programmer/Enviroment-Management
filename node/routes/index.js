const express = require("express");
const router = express.Router();
const userRouter = require("./user.js");
const garbageRouter = require("./garbage.js");
const checkinRouter = require("./checkin.js");
const activityRouter = require("./activity.js");
const user_activityRouter = require("./user_activity.js");
const ai_recognitionRouter = require("./ai_recognition.js");
const securityRouter = require("./security.js");
const notificationRouter = require("./notification.js");
const user_notificationRouter = require("./user_notification.js");
const adminRouter = require("./Admin/admin.js");
const messageRouter = require("../routes/Message/message.js");
const authenticateToken = require("../auth/auth.js");

const jwt = require("jsonwebtoken");
router.get("/", (req, res) => {
  res.send("hello world");
});
router.use("/user", userRouter);
router.use("/garbage", authenticateToken, garbageRouter);
router.use("/checkin", authenticateToken, checkinRouter);
router.use("/activity", authenticateToken, activityRouter);
router.use("/user_activity", authenticateToken, user_activityRouter);
router.use("/ai_recognition", authenticateToken, ai_recognitionRouter);
router.use("/notification", authenticateToken, notificationRouter);
router.use("/user_notification", authenticateToken, user_notificationRouter);
router.use("/security", securityRouter);
router.use("/admin", adminRouter);
router.use("/message", authenticateToken, messageRouter);


module.exports = router;
