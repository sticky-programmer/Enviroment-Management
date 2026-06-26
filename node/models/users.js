const userTable = require("../tables/userTable.js");
const checkinTable = require("../tables/checkinTable.js");
const { Op } = require("sequelize");
class Users {
  register(username, password) {
    return userTable.create({
      username,
      password,
      createTime: new Date(),
    });
  }
  login(username, password) {
    return userTable.findOne({
      where: {
        username,
        password,
      },
    });
  }
  findById(id) {
    return userTable.findOne({
      where: {
        id: parseInt(id),
      },
    });
  }

  findAll(query) {
    return userTable.findAll(query);
  }
  updatePassword(id, password) {
    return userTable.update(
      {
        password,
      },
      {
        where: {
          id: parseInt(id),
        },
      },
    );
  }
  updateAvatar(id, avatar) {
    return userTable.update(
      {
        avatar,
      },
      {
        where: {
          id: parseInt(id),
        },
      },
    );
  }
  update(id, data) {
    return userTable.update(data, {
      where: {
        id: parseInt(id),
      },
    });
  }
  getUserCheckinList(query) {
    return userTable.findAll({
      include: {
        model: checkinTable,
        required: false,
      },
      ...query,
    });
  }
  search_Checkin(query) {
    if (!query.nickname&&!query.username) {
      return [];
      console.log("搜索为空");
    }
    return userTable.findAll({
      where: {
        [Op.or]: [
          { username: { [Op.like]: `%${query.username}%` } },
          { nickname: { [Op.like]: `%${query.nickname}%` } },
        ],
      },
      include: {
        model: checkinTable,
        required: false,
      },
    });
  }
  updateStatus(id,status){
    return userTable.update({
      status,
    },{
      where: {
        id: parseInt(id),
      },
    })
  }
}
module.exports = Users;
