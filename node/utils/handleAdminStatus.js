const Admin = require("../models/Admin/admin.js");
const adminDao = new Admin();
async function handleAdminStatus(id,status) {
    try {
        await adminDao.updateStatus(id, status);
    } catch (error) {
        console.log(error);
    }
}
module.exports = handleAdminStatus;