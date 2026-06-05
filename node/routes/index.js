const express = require("express");
const router = express.Router();
const userRouter = require("./user.js");
const garbageRouter = require("./garbage.js");
const checkinRouter = require("./checkin.js");
const activityRouter = require("./activity.js");
const user_activityRouter = require("./user_activity.js");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "123456";
router.get("/", (req, res) => {
  res.send("hello world");
});
router.use("/user", userRouter);
router.use("/garbage", authenticateToken, garbageRouter);
router.use("/checkin", authenticateToken, checkinRouter);
router.use("/activity", authenticateToken, activityRouter);
router.use("/user_activity", authenticateToken, user_activityRouter);
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "不存在token" });
  } else {
    try {
      const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: "token无效" });
    }
  }
}
module.exports = router;
