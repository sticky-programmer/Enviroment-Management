const express = require("express");
const activityRouter = express.Router();
const Activity = require("../models/activity.js");
const activity = new Activity();
activityRouter.get("/", (req, res) => {
  activity
    .findAll(req.query)
    .then((data) => {
      res.status(200).send({ message: "查询成功", data });
    })
    .catch((err) => {
      res.status(500).send({ message: "查询失败" });
    });
});

activityRouter.get("/:id", (req, res) => {
  activity
    .findByPk(req.params.id)
    .then((data) => {
      res.status(200).send({ message: "查询成功", data });
    })
    .catch((err) => {
      res.status(500).send({ message: "不存在该活动" });
    });
});
activityRouter.post("/", (req, res) => {
  activity
    .create(req.body)
    .then((data) => {
      res.status(200).send({ message: "创建成功", data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "创建失败,请检查输入信息" });
    });
});
activityRouter.delete("/:id", (req, res) => {
  const {id}=req.params;
  if(!id) return res.status(300).send({ message: "请输入活动ID" });
  activity
    .delete(id)
    .then((data) => {
      res.status(200).send({ message: "删除成功", data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "删除失败,请检查输入信息" });
    });
});
module.exports = activityRouter;
