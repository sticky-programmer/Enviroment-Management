const express = require("express");
const Message = require("../../models/Message/message.js");
const ConversationDao = require("../../models/Message/conversation.js");
const conversationDao = new ConversationDao();
const messageDao = new Message();
const messageRouter = express.Router();
messageRouter.get("/conversation", async (req, res) => {
  const auth=req.auth;
  const role = auth.role;
  if (role != "admin" && role != "user") {
    res.status(400).send("role错误");
    return;
  }
  let id = auth.id;
  if (!Number(id)) {
    res.status(400).send("adminId错误");
    return;
  }
  id = Number(id);
  if (role === "admin") {
    try {
      const result = await conversationDao.getConversation(id,role);
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  } else {
    try {
      const result = await conversationDao.getConversation(id,role);
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
});
module.exports = messageRouter;
