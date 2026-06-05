const checkinTable = require("../tables/checkinTable.js");
class Checkin {
    create(data){
        return checkinTable.create(data);
    }
    findByUserId(id){
        return checkinTable.findAll({
            where:{
                userId:id,
            }
        });
    }
}
module.exports = Checkin;
