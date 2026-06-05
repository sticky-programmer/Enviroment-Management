const express = require("express");
const garbageRouter = express.Router();
const Garbage = require("../models/garbage.js");
const e = require("express");
const garbage = new Garbage();
garbageRouter.get("/", (req,res)=>{
    garbage.findAll().then((data)=>{
        res.status(200).send({message:"查询成功",data});
    }).catch((err)=>{
        res.status(500).send({message:"查询失败",err});
    });
});
garbageRouter.post("/", (req,res)=>{
    garbage.create(req.body).then((data)=>{
        res.status(200).send({message:"创建成功",data});
    }).catch((err)=>{
        res.status(500).send({message:"创建失败",err});
    });
});

module.exports = garbageRouter;
