const userTable = require("../tables/userTable.js");
class Users {
  register(username,password){
    return userTable.create({
      username,
      password,
      createTime:new Date(),
    })
  }
  login(username,password){
    return userTable.findOne({
      where:{
        username,
        password,
      }
    })
  }
  findById(id){
    return userTable.findOne({
      where:{
        id:parseInt(id),
      }
    })
  }

  findAll(){
    return userTable.findAll();
  }
}
module.exports = Users;
