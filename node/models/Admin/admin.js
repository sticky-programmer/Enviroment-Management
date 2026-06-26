const adminTable = require("../../tables/Admin/adminTable.js");
class Admin {
  create(username, hashpassword) {
    return adminTable.create({
      username,
      password: hashpassword,
      createTime: new Date().getTime(),
    });
  }
  login(username) {
    return adminTable.findOne({
      where: {
        username,
      },
    });
  }
  getAdmin(id) {
    return adminTable.findOne({
      where: {
        id,
      },
    });
  }
  findById(id) {
    return adminTable.findOne({
      where: {
        id: parseInt(id),
      },
    });
  }
  updateStatus(id, status) {
    return adminTable.update({
      online: status,
    }, {
      where: {
        id: parseInt(id),
      },
    });
  }
  getAdminList() {
    return adminTable.findAll({
      attributes: ["id", "online"],
    });
  }
}
module.exports = Admin;
