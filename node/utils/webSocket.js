const ConversationDao = require("../models/Message/conversation.js");
const MessageDao = require("../models/Message/message.js");
const Users = require("../models/users.js");
const Admin = require("../models/Admin/admin.js");
const userDao = new Users();
const adminDao = new Admin();
const conversationDao = new ConversationDao();
const messageDao = new MessageDao();
function checkMessageInstruction(toId, content) {
  if (!Number(toId)) {
    return false;
  }
  if (content === undefined || content === null) {
    return false;
  }
  return true;
}
function handleSendMsgInsturction(msg, sender) {
  if (sender.role === "user") {
    return {
      userId: sender.dataValues.id,
      nickname: sender.dataValues.nickname || "用户",
      avatar: sender.dataValues.avatar || "",
      id: msg.dataValues.id,
      content: msg.dataValues.content,
      sendRole: sender.role,
      time: msg.dataValues.time,
      conversationId: msg.dataValues.conversationId,
    };
  }
  if (sender.role === "admin") {
    return {
      adminId: sender.dataValues.id,
      id: msg.dataValues.id,
      content: msg.dataValues.content,
      sendRole: sender.role,
      time: msg.dataValues.time,
      conversationId: msg.dataValues.id,
    };
  }
}
async function getSender(auth) {
  let sender = null;
  if (auth.role === "user") {
    sender = await userDao.findById(auth.id);
  }
  if (auth.role === "admin") {
    sender = await adminDao.findById(auth.id);
  }
  return sender;
}
async function handleMessageConversation(msg, auth) {
  const { toId, content } = msg;
  const fromId = auth.id;
  let conversation = null;
  try {
    conversation = await conversationDao.isHaveConversation({
      fromId,
      toId,
    });
    if (conversation === null || conversation === undefined) {
      if (auth.role === "user") {
        conversation = await conversationDao.createConversation({
          userId: fromId,
          adminId: toId,
          lastMessageTime: new Date().getTime(),
        });
      } else if (auth.role === "admin") {
        conversation = await conversationDao.createConversation({
          adminId: fromId,
          userId: toId,
          lastMessageTime: new Date().getTime(),
        });
      }
    }
    const message = await messageDao.createMessage({
      conversationId: conversation.dataValues.id,
      sendRole: auth.role,
      content: msg.content,
      time: new Date().getTime(),
    });
    return message;
  } catch (err) {
    console.log(err);
    return false;
  }
}
function sendMessage(msg, sender, userMap, adminMap,toId) {
  if (sender.dataValues.role === "admin") {
    userMap.get(toId)?.emit("message", msg);
  }
  if (sender.dataValues.role === "user") {
    console.log(2);
    adminMap.get(toId)?.emit("message", msg);
  }
}
async function handleTransition(msg, socket, userMap, adminMap) {
  const { toId, content } = msg;
  const auth = socket.handshake.auth;
  if (!checkMessageInstruction(toId, content)) {
    socket.emit("error", "发送失败");
    return;
  }
  try {
    const Sender = await getSender(auth);
    if (Sender === null || Sender === undefined) {
      socket.emit("error", "发送失败,用户不存在或已删除");
      return;
    }
    const result = await handleMessageConversation(msg, auth);
    if (!result) {
      socket.emit("error", "发送失败,服务器错误");
      return;
    }
    msg = handleSendMsgInsturction(result, Sender);
    sendMessage(msg, Sender, userMap, adminMap,toId);
  } catch (error) {
    console.log(error);
  }
}
module.exports = handleTransition;
