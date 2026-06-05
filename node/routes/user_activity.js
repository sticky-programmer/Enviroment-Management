const express = require("express");
const user_activityRouter = express.Router();
const UserActivity = new require('../models/user_activity.js');
const userActivity = new UserActivity();
user_activityRouter.post("/", (req, res) => {
    userActivity.create(req.body)
    .then((data) => {
      res.send({ message: "创建用户活动成功", code: 200, data: data });
    })
    .catch(() => {
      res.send({ message: "创建用户活动失败", code: 500 });
    });
});
user_activityRouter.get("/", (req, res) => {
  userActivity
    .findAll()
    .then((data) => {
      res.send({ message: "获取用户活动列表成功", data: data });
    })
    .catch(() => {
      res.send({ message: "获取用户活动列表失败", code: 500 });
    });
});
user_activityRouter.get("/user/:id", (req, res) => {
  const { id } = req.params;
  userActivity
    .findByUserId(id)
    .then((data) => {
      res.send({ message: "获取用户活动详情", code: 200, data: data });
    })
    .catch(() => {
      res.send({ message: "获取用户活动详情失败", code: 500 });
    });
});
user_activityRouter.get("/activity/:id", (req, res) => {
  const { id } = req.params;
  userActivity
    .findByActivityId(id)
    .then((data) => {
      res.send({ message: "获取活动具体活动成功", code: 200, data: data });
    })
    .catch(() => {
      res.send({ message: "获取活动具体活动失败", code: 500 });
    });
});
user_activityRouter.get("/activity_extend", (req, res) => {
  userActivity
    .findAllExtend()
    .then((data) => {
      res.send({ message: "获取活动详情成功", code: 200, data: data });
    })
    .catch((e) => {
      res.send({ message: "获取活动详情失败", code: 500,e: e });
    }); 
});
module.exports = user_activityRouter;
