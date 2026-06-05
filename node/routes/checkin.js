const express = require("express");
const checkinRouter = express.Router();
const jwt = require("jsonwebtoken");
const Checkin = require("../models/checkin.js");
const checkin = new Checkin();
const SECRET_KEY = "123456";
checkinRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  checkin.findByUserId(id).then((data)=>{
    res.send({message:"查询成功",data});
  }).catch((err)=>{
    res.status(500).send({message:"查询失败"});
  });
});
checkinRouter.post("/", (req, res) => {
  console.log(req.body);
  checkin.create(req.body).then((data)=>{
    res.status(200).send({message:"创建成功",data});
  }).catch((err)=>{
    res.status(500).send({message:"创建失败",err});
  });
});
module.exports = checkinRouter;
