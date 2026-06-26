const express = require("express");
const garbageRouter = express.Router();
const Garbage = require("../models/garbage.js");
const e = require("express");
const garbage = new Garbage();
garbageRouter.get("/", (req, res) => {
  garbage
    .findAll()
    .then((data) => {
      res.status(200).send({ message: "查询成功", data });
    })
    .catch((err) => {
      res.status(500).send({ message: "查询失败", err });
    });
});
garbageRouter.post("/", (req, res) => {
  if (req.body.name === "" || req.body.type === "") {
    res.status(400).send({ message: "请填写完整信息", code: 400 });
    return;
  }
  garbage
    .create(req.body)
    .then((data) => {
      res.status(200).send({ message: "创建成功", code: 200, data });
    })
    .catch((err) => {
      res.status(500).send({ message: "创建失败", code: 500, error: err });
    });
});
garbageRouter.delete("/:id", (req, res) => {
  garbage
    .delete(Number(req.params.id))
    .then((data) => {
      res.status(200).send({ message: "删除成功", data });
    })
    .catch((err) => {
        console.log(err);
      res.status(500).send({ message: "删除失败,服务器错误" });
    });
});
module.exports = garbageRouter;
