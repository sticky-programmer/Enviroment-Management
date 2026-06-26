const express = require("express");
const userRouter = require("express").Router();
const Users = require("../models/users.js");
const jwt = require("jsonwebtoken");
const axios = require("axios");
userRouter.use(express.raw({ limit: "3mb" }));
const compress = require("sharp");
const SECRET_KEY = "123456";
const users = new Users();
userRouter.post("/avatar/:id", async (req, res) => {
  const { id } = req.params;
  const avatar = req.body;
  const compressed = await compress(avatar)
    .resize({ width: 200, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();
  const response = await axios.post(
    "http://8.137.192.209:3001/upload",
    compressed,
    {
      headers: {
        "Content-Type": "application/octet-stream", // 标识二进制格式
      },
    },
  );
  users
    .updateAvatar(id, response.data.url)
    .then((data) => {
      res.send({ message: "更新成功", code: 200 });
    })
    .catch(() => {
      res.status(500).send({ message: "更新失败", code: 500 });
    });
});
userRouter.put("/update/:id", (req, res) => {
  const { id } = req.params;
  if (!Number(id)) {
    res.status(400).send({ message: "id格式错误" });
    return;
  }
  console.log(id);
  console.log(req.body);
  users
    .update(id, req.body)
    .then((data) => {
      res.send({ message: "更新成功", code: 200 });
    })
    .catch((e) => {
      console.log(e);
      res.send({ message: "更新失败", code: 500 });
    });
});
userRouter.post("/register", (req, res) => {
  const { username, password } = req.body;
  users
    .register(username, password)
    .then((data) => {
      console.log(data);
      res.send({ message: "注册成功", code: 200 });
    })
    .catch(() => {
      res.send({ message: "注册失败", code: 500 });
    });
});

userRouter.post("/login", (req, res) => {
  const { username, password } = req.body;
  users
    .login(username, password)
    .then((data) => {
      if (data) {
        const token = jwt.sign(
          {
            username: data.username,
            id: data.id,
            createTime: data.createTime,
            role: data.role,
          },
          SECRET_KEY,
        );
        res.status(200).send({
          message: "登录成功",
          data: {
            token,
            id: data.id,
            username: data.username,
            createTime: data.createTime,
            nickname: data.nickname,
            avatar: data.avatar,
            checkScores: data.checkScores,
          },
        });
      } else {
        res.status(400).send({ message: "账号或者密码错误" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "登录失败", code: 500, err: err });
    });
});
userRouter.get("/userCheckin", async (req, res) => {
  try {
    const currentPage = req.query.currentPage || 1;
    const pageSize = req.query.pageSize || 10;
    const result = await users.getUserCheckinList({
      offset: (currentPage - 1) * pageSize,
      limit: pageSize,
    });
    const TotalUser = (await users.findAll({ count: true })).length;
    res.send({
      message: "获取成功",
      data: { TotalUser, list: result } || {},
    });
  } catch (err) {
    console.log(err);
    res.send({ message: "获取用户签到列表失败", code: 500, err: err });
  }
});
userRouter.get("/", (req, res) => {
  const query = req.query;
  users
    .findAll(query)
    .then((data) => {
      res.send({ message: "获取用户列表成功", data: data });
    })
    .catch(() => {
      res.send({ message: "获取用户列表失败", code: 500 });
    });
});
userRouter.get("/search_checkin", async (req, res) => {
  try {
    const query = req.query;
    const result = await users.search_Checkin(query);
    console.log(result);
    res.send({
      message: "搜索用户成功",
      data: { TotalUser: result.length, list: result },
    });
  } catch (err) {
    console.log(err);
    res.send({ message: "搜索用户失败", code: 500, err: err });
  }
});
userRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  users
    .findById(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send({ message: "用户不存在", code: 404 });
    });
});
userRouter.patch("/status/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!Number(id)) {
    res.status(404).send({ message: "id格式错误", code: 400 });
    return;
  }
  if (status === undefined) {
    res.status(404).send({ message: "状态格式错误", code: 400 });
    return;
  }
  users
    .updateStatus(id, status)
    .then((data) => {
      res.send({ message: "更新成功", code: 200 });
    })
    .catch(() => {
      res.send({ message: "更新失败", code: 500 });
    });
});
module.exports = userRouter;
