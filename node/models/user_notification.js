const user_notificationTable = require("../tables/user_notificationTable");
const notificationTable = require("../tables/notificationTable");
const activityTable = require("../tables/activityTable");
const {Op} = require("sequelize");
class UserNotification {
  createUserNotification(notification, userId) {
    return user_notificationTable.create({
      notificationId: notification.id,
      userId,
    });
  }
  getUserNotifications(userId) {
    const thirtyDaysAgo = new Date().getTime() - 1000 * 60 * 60 * 24 * 30 + 1000 * 60 * 60 * 8;
    return user_notificationTable.findAll({
      attributes: ["id", "deleted", "isRead", "readTime", "createTime"],
      where: {
        userId,
        deleted: false,
        [Op.or]:[
          {isRead:false},
          {isRead:true,createTime:{[Op.gte]:thirtyDaysAgo}}
        ],
      },
      include: [
        {
          model: notificationTable,
          include: [{
            model: activityTable,
          }],
        },
      ],
    });
  }
  markAsRead(id) {
    return user_notificationTable.update({
      isRead: true,
      readTime: new Date(),
    }, {
      where: {
        id,
      },
    });
  }
}
module.exports = UserNotification;
