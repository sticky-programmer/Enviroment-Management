const messageTable = require("../../tables/Message/messageTable.js");
class MessageDao {
    createMessage(msg){
        return messageTable.create(msg);
    }
    getMessage(query,limit,offset){
        return messageTable.findAll({
            where:{
                ...query
            },
            limit:Number(limit),
            offset:Number(offset)
        });
    }
}
module.exports = MessageDao;