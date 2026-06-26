const express = require("express");
const adminRouter = express.Router();
const bcrypt = require("bcrypt");
const Admin = require("../../models/Admin/admin.js");
const jwt = require("jsonwebtoken");
const admin = new Admin();
adminRouter.post("/register", async (req, res) => {
  const { username, password, key } = req.body;
  const hashpassword = await bcrypt.hash(password, 10);
  if (key !== process.env.ADMIN_KEY) {
    res.status(400).send({ message: "管理员密钥错误", code: 400 });
    return;
  }
  admin
    .create(username, hashpassword)
    .then((data) => {
      res.send({ message: "注册成功", code: 200 });
    })
    .catch((e) => {
      res.send({ message: "注册失败", code: 500, error: e.message });
    });
});
adminRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  admin
    .login(username)
    .then(async (data) => {
      if (data) {
        const isMatch = await bcrypt.compare(password, data.password);
        if (isMatch) {
          const token = jwt.sign(
            {
              username: data.username,
              id: data.id,
              role: data.role,
              createTime: data.createTime,
            },
            process.env.SECRET_KEY,
          );
          res.send({ message: "登录成功", code: 200, token, id: data.id });
        } else {
          res.send({ message: "账号或者密码错误", code: 400 });
        }
      } else {
        res.send({ message: "账号或者密码错误", code: 400 });
      }
    })
    .catch((e) => {
      console.log(e);
      res.send({ message: "服务端出错了", code: 500 });
    });
});
adminRouter.get("/admins",async (req,res)=>{
  try{
    const data = await admin.getAdminList();
    res.send({ message: "获取成功", code: 200, data });
  }catch(error){
    console.log(error)
    res.status(500).send({ message: "服务端出错了" });
  }
})
adminRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  admin
    .getAdmin(id)
    .then((data) => {
      res.send({ message: "获取成功", code: 200, data });
    })
    .catch(() => {
      res.send({ message: "获取失败", code: 500 });
    });
});
module.exports = adminRouter;
