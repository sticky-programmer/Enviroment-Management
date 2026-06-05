const userRouter = require("express").Router();
const Users = require("../models/users.js");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "123456";
const users = new Users();

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
          { username: data.username, id: data.id },
          SECRET_KEY,
        );
        res.send({
          message: "登录成功",
          token,
          code: 200,
          id: data.id,
          username: data.username,
        });
      } else {
        res.send({ message: "账号或者密码错误", code: 400 });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "登录失败", code: 500 });
    });
});
userRouter.get("/", (req, res) => {
  users
    .findAll()
    .then((data) => {
      res.send({ message: "获取用户列表成功", data: data });
    })
    .catch(() => {
      res.send({ message: "获取用户列表失败", code: 500 });
    });
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
userRouter.get("/my_activity/:id", (req, res) => {
});
module.exports = userRouter;
