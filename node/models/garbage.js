const garbageTable = require("../tables/garbageTable.js");
class Garbage {
    findAll() {
        return garbageTable.findAll();
    }
    create(data){
        return garbageTable.create(data);
    }
    delete(id){
        return garbageTable.destroy({
            where:{
                id:id
            }
        });
    }
}
module.exports = Garbage;