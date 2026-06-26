const notificationTable = require("../tables/notificationTable");
class Notification {
    createNotification(notification) {
        return notificationTable.create(notification);
    }
}
module.exports = Notification;
