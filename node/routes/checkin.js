const express = require("express");
const multer = require("multer");
const compress = require("sharp");
const axios = require("axios");
const checkinRouter = express.Router();
const jwt = require("jsonwebtoken");
const Checkin = require("../models/checkin.js");
const checkin = new Checkin();
const SECRET_KEY = "123456";
const upload = multer({
  storage: multer.memoryStorage(),
});
checkinRouter.get("/list", (req, res) => {
  checkin
    .findByStatus()
    .then((data) => {
      res.send({ message: "查询成功", data });
    })
    .catch((err) => {
      res.status(500).send({ message: "查询失败", err });
    });
});
checkinRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  checkin
    .findByUserId(id)
    .then((data) => {
      res.send({ message: "查询成功", data });
    })
    .catch((err) => {
      res.status(500).send({ message: "查询失败" });
    });
});
checkinRouter.post("/", (req, res) => {
  console.log(req.body);
  checkin
    .create(req.body)
    .then((data) => {
      res.status(200).send({ message: "创建成功", data });
    })
    .catch((err) => {
      res.status(500).send({ message: "创建失败", err });
    });
});
checkinRouter.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    await checkin.create(req.body);
    res.status(200).send({ message: "上传成功" });
    return;
  }
  try {
    const compressed = await compress(req.file.buffer)
      .resize({ width: 200, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();
    const { data } = await axios.post(
      "http://8.137.192.209:3001/upload",
      compressed, // 直接传buffer，不是{}
      {
        headers: {
          "Content-Type": "application/octet-stream", // 标识二进制格式
        },
      },
    );
    const url = data.url;
    await checkin.create({ ...req.body, photo: url });
    res.status(200).send({ message: "上传成功" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "上传失败", err });
  }
});
checkinRouter.put("/:id", (req, res) => {
  const id = req.params.id;
  if(!Number(id)){
    res.status(400).send({ message: "id格式错误" });
    return;
  }
  checkin
    .update(id, req.body)
    .then((data) => {
      res.status(200).send({ message: "更新成功", data });
    })
    .catch((err) => {
      res.status(500).send({ message: "更新失败", err });
    });
});
module.exports = checkinRouter;
