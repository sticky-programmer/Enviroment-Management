const conversationTable = require("../../tables/Message/conversationTable.js");
const userTable = require("../../tables/userTable.js");
const adminTable = require("../../tables/Admin/adminTable.js");
const messageTable = require("../../tables/Message/messageTable.js");
const { Op } = require("sequelize");
class ConversationDao {
  constructor() {
    this.conversationTable = conversationTable;
  }
  createConversation(conversation) {
    return this.conversationTable.create(conversation);
  }
  getConversation(id, role) {
    if (role === "admin") {
      return this.conversationTable.findAll({
        where: {
          adminId: id,
        },
        include: [
          {
            model: userTable,
            attributes: ["id", "nickname", "avatar"],
          },
          {
            model: messageTable,
            order: [["id", "ASC"]],
            where: {
              time: {
                [Op.gte]: new Date().getTime() - 1000 * 60 * 60 * 24 * 7,
              },
            },
          },
        ],
      });
    } else {
      return this.conversationTable.findAll({
        where: {
          userId: id,
        },
        include: [
          {
            model: adminTable,
            attributes: ["id","online"],
          },
          {
            model: messageTable,
            where: {
              time: {
                [Op.gte]: new Date().getTime() - 1000 * 60 * 60 * 24 * 7,
              },
            },
          },
        ],
      });
    }
  }
  isHaveConversation(query) {
    return this.conversationTable.findOne({
      where: {
        [Op.or]: [
          {
            userId: query.fromId,
            adminId: query.toId,
          },
          {
            adminId: query.fromId,
            userId: query.toId,
          },
        ],
      },
    });
  }
}
module.exports = ConversationDao;
