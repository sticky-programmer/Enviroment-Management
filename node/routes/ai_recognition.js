const express = require("express");
const ai_recognitionRouter = express.Router();

// ========== 在文件顶部添加依赖 ==========
const axios = require("axios");
const querystring = require("querystring");

// ========== 你的 API 配置（直接写在这里）==========
const TIAN_API_KEY = "f64c93fd8c53e5e1b165ac7694fddee0";
const TIAN_API_URL = "https://api.tianapi.com/imglajifenlei/index";
ai_recognitionRouter.use(express.raw({ limit: "2mb" }));
// ========== 新增：AI 识别接口 ==========
ai_recognitionRouter.post("/", async (req, res) => {
  try {
    // 获取上传的图片 Buffer
    const imgBuffer = req.body;
    if (!imgBuffer || imgBuffer.length === 0) {
      return res.status(400).json({ code: 400, msg: "无图片数据" });
    }

    // Buffer 转 Base64
    const imageBase64 = imgBuffer.toString("base64");

    // 调用天行数据 API
    const response = await axios.post(
      TIAN_API_URL,
      querystring.stringify({
        key: TIAN_API_KEY,
        img: imageBase64,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );
    console.log(response.data);
    // 返回识别结果
    if (response.data.code === 200 && response.data.newslist) {
      const result = response.data.newslist[0];

      // 类别码映射
      const typeMap = {
        0: "可回收物",
        1: "有害垃圾",
        2: "厨余垃圾（湿垃圾）",
        3: "其他垃圾（干垃圾）",
      };

      res.json({
        name: result.name,
        category: typeMap[result.lajitype] || "未知",
        tip: result.lajitip,
        confidence: result.trust,
      });
    } else {
      res.json({
        success: false,
        msg: response.data.msg || "识别失败",
      });
    }
  } catch (err) {
    console.error("识别错误:", err.message);
    res.status(500).json({
      success: false,
      msg: "识别服务异常",
    });
  }
});
module.exports = ai_recognitionRouter;
