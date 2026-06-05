const garbageTable = require("../tables/garbageTable.js");
class Garbage {
    findAll() {
        return garbageTable.findAll();
    }
    create(data){
        return garbageTable.create(data);
    }
}
module.exports = Garbage;