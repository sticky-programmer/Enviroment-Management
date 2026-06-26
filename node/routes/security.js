const express = require("express");
const securityRouter = express.Router();
const Users=require("../models/users.js");
const user=new Users();
securityRouter.post("/innerResetPassword", async (req, res)=>{
    const { oldpassword, newpassword } = req.body;
    const id=Number(req.query.id);
    const result=await user.findById(id);
    if(result){
      if(result.password===oldpassword){
          const updateResult=await user.updatePassword(id,newpassword);
          if(updateResult[0]===1){
            res.status(200).send({message:"修改成功"});
          }else{
            res.send({message:"修改失败",code:500});
          }
        }else{
          res.send({message:"原密码错误",code:403});
        }
    }else{
      res.send({message:"用户不存在",code:404});
    }
}); 
module.exports = securityRouter;