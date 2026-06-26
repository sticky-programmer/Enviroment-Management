const user_activityTable = require("../tables/user_activityTable.js");
const userTable = require("../tables/userTable.js");
const activityTable = require("../tables/activityTable.js");
const { Op } = require("sequelize");
class UserActivity {
  findAll() {
    return user_activityTable.findAll();
  }
  create(data) {
    return user_activityTable.create(data);
  }
  findByUserId(userId) {
    return user_activityTable.findAll({
      where: {
        userId: userId,
      },
    });
  }
  findByActivityId(activityId) {
    return user_activityTable.findAll({
      where: {
        activityId: activityId,
      },
    });
  }
  findAllExtend(currentPage, pageSize) {
    return activityTable.findAll({
      include: [
        {
          model: user_activityTable,
          required: false,
        },
      ],
      offset: (currentPage - 1) * pageSize,
      limit: pageSize,
    });
  }
  findActivityOfUserById(userId) {
    return user_activityTable.findAll({
      where: {
        userId: userId,
      },
      include: [
        {
          model: activityTable,
          required: false,
        },
      ],
    });
  }
  findUserOfActivityId(activityId) {
    return user_activityTable.findAll({
      where: {
        activityId: activityId,
      },
      include: [
        {
          model: userTable,
          required: false,
        },
      ],
    });
  }
  updateFeedback(id, data) {
    return user_activityTable.update(data, {
      where: {
        id: id,
      },
    });
  }
  getCurrentMonthNumber(startMonth,endMonth) {
    return user_activityTable.count({
      where: {
        createTime: {
          [Op.between]: [startMonth, endMonth],
        }
      },
    });
  }
  delete(id) {
    return user_activityTable.destroy({
      where: {
        id: id,
      },
    });
  }
}
module.exports = UserActivity;
