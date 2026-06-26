const express = require("express");
const user_activityRouter = express.Router();
const UserActivity = new require("../models/user_activity.js");
const userActivity = new UserActivity();
user_activityRouter.post("/", (req, res) => {
  console.log(req.body.createTime);
  userActivity
    .create(req.body)
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
  //获取userId为id的数据
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
  //获取activityId为id的数据
  const { id } = req.params;
  userActivity
    .findByActivityId(id)
    .then((data) => {
      res.send({ message: "获取活动具体成功", code: 200, data: data });
    })
    .catch(() => {
      res.send({ message: "获取活动具体失败", code: 500 });
    });
});
user_activityRouter.get("/apply/total", (req, res) => {
  let { currentPage, pageSize } = req.query;
  if (!currentPage) {
    currentPage = 1;
    console.log(currentPage);
  }
  if (!pageSize) {
    pageSize = 1000;
    console.log(pageSize);
  }
  userActivity
    .findAllExtend(Number(currentPage), Number(pageSize))
    .then((data) => {
      res.send({ message: "获取活动报名申请总数成功", code: 200, data: data });
    })
    .catch((error) => {
      res.send({
        message: "获取活动报名申请总数失败",
        code: 500,
        error: error,
      });
    });
});
user_activityRouter.get("/apply/user/:id", (req, res) => {
  const { id } = req.params;
  userActivity
    .findActivityOfUserById(id)
    .then((data) => {
      res.send({ message: "获取活动报名详情", code: 200, data: data });
    })
    .catch(() => {
      res.send({ message: "获取活动报名详情失败", code: 500 });
    });
});
user_activityRouter.get("/apply/activity/:id", (req, res) => {
  const { id } = req.params;
  userActivity
    .findUserOfActivityId(id)
    .then((data) => {
      res.send({ message: "获取活动报名详情", code: 200, data: data });
    })
    .catch(() => {
      res.send({ message: "获取活动报名详情失败", code: 500 });
    });
});
user_activityRouter.post("/feedback/:id", (req, res) => {
  userActivity
    .updateFeedback(req.params.id, req.body)
    .then(() => {
      res.send({ message: "更新用户活动评价成功", code: 200 });
    })
    .catch(() => {
      res.send({ message: "更新用户活动评价失败", code: 500 });
    });
});
user_activityRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  userActivity
    .delete(id)
    .then(() => {
      res.send({ message: "删除用户活动成功", code: 200 });
    })
    .catch(() => {
      res.send({ message: "删除用户活动失败", code: 500 });
    });
});
user_activityRouter.get("/current_monthNumber", (req, res) => {
  const now=new Date();
  const month=now.getMonth();
  const year=now.getFullYear();
  const startMonth=new Date(year,month,1);
  const endMonth=new Date(year,month+1,1);
  userActivity
    .getCurrentMonthNumber(startMonth,endMonth)
    .then((data) => {
      res.send({ message: "获取本月报名人数成功", code: 200, data: data });
    })
    .catch(() => {
      res.send({ message: "获取本月报名人数失败", code: 500 });
    });
});
module.exports = user_activityRouter;
