function handleConnectMap(userMap, adminMap, socket, auth) {
  if (auth.role === "user") {
    if (userMap.has(auth.id)) {
      userMap.get(auth.id).disconnect();
      userMap.delete(auth.id);
    }
    userMap.set(auth.id, socket);
  } else if (auth.role === "admin") {
    if (adminMap.has(auth.id)) {
      adminMap.get(auth.id).disconnect();
      adminMap.delete(auth.id);
    }
    adminMap.set(auth.id, socket);
  }
}
function handleDisconnectMap(userMap, adminMap, auth) {
  if (auth.role === "user") {
    userMap.get(auth.id).disconnect();
    userMap.delete(auth.id);
  } else if (auth.role === "admin") {
    adminMap.get(auth.id).disconnect();
    adminMap.delete(auth.id);
  }
}
module.exports = { handleConnectMap, handleDisconnectMap };
