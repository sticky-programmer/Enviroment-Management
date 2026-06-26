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
    findByStatus(){
        return checkinTable.findAll({
            where:{
                status:false,
            }
        });
    }
    update(id,data){
        return checkinTable.update(data,{
            where:{
                id:id,
            }
        });
    }
}
module.exports = Checkin;
