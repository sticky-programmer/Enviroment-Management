const jwt = require("jsonwebtoken");

function webSocketAuth(socket, next) {
  const token = socket.handshake.auth.token;
  if (!token) {
    socket.disconnect(true);
    return;
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      socket.disconnect(true);
      return;
    }
    socket.handshake.auth = decoded;
    next();
  });
}
module.exports = webSocketAuth;
