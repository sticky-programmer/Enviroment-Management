const activityTable = require("../tables/activityTable.js");
class Activity {
  findAll(query) {
    if (query.pageSize) {
      query.pageSize = Number(query.pageSize);
    }
    if (query.currentPage) {
      query.currentPage = Number(query.currentPage);
    }
    return activityTable.findAll({
        limit: query.pageSize,
        offset: (query.currentPage - 1) * query.pageSize ||0,
    });
  }
  create(data) {
    return activityTable.create(data);
  }
  findByPk(id) {
    return activityTable.findByPk(id);
  }
  delete(id) {
    return activityTable.destroy({ where: { id } });
  }
}
module.exports = Activity;
