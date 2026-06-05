const user_activityTable = require("../tables/user_activityTable.js");
const userTable = require("../tables/userTable.js");
const activityTable = require("../tables/activityTable.js");
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
      include: [
        {
          model: activityTable,
          attributes: [
            "title",
            "beginTime",
            "endTime",
            "description",
            "contact",
            "address",
            "image",
            "maxNum",
            "organizer",
          ],
        },
      ],
    });
  }
  findByActivityId(activityId) {
    return user_activityTable.findAll({
      where: {
        activityId: activityId,
      },
      include: [
        {
          model: userTable,
          attributes: ["username", "nickname", "avatar", "email", "phone"],
        },
      ],
    });
  }
  findAllExtend() {
    return user_activityTable.findAll({
      include: [
        {
          model: activityTable,
          required: false,
          right: true,
        },
      ],
      raw: true,
    });
  }
}
module.exports = UserActivity;
