const userMap = new Map();
const adminMap = new Map();
const webSocketAuth = require("./auth/webSocketAuth.js");
const handleTransition = require("./utils/webSocket.js");
const {
  handleConnectMap,
  handleDisconnectMap,
} = require("./utils/handleMap.js");
const handleAdminStatus = require("./utils/handleAdminStatus.js");
function controllWebSocket(io) {
  io.use(webSocketAuth);
  io.on("connection", (socket) => {
    const auth = socket.handshake.auth;
    if(auth.role === "admin"){
      handleAdminStatus(auth.id, true);
    }
    handleConnectMap(userMap, adminMap, socket, auth);
    socket.on("message", (msg) => {
      handleTransition(msg, socket, userMap, adminMap);
    });
    socket.on("error", (err) => {
      console.log(err);
    });
    socket.on("disconnect", () => {
      handleDisconnectMap(userMap, adminMap, auth);
      console.log(`${auth.role} ${auth.id} 连接已经断开`);
    });
    console.log("当前连接人数:", io.engine.clientsCount);
    console.log("当前连接用户数:", userMap.size);
    console.log("当前连接管理员数:", adminMap.size);
  });
  io.on("disconnect", () => {
    if(auth.role === "admin"){
      handleAdminStatus(auth.id, false);
    }
    console.log("服务器连接已经断开");
  });
}
module.exports = controllWebSocket;
