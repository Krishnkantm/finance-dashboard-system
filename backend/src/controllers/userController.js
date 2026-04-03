const generateToken = require('../utils/generateToken.js');
const userService = require('../services/userService.js');

const createUser = async(req,res)=>{
   try{
      const user = await userService.createUser(req.body);

      res.status(200).json({
         success:true,
         data:user
      });
   }
   catch(err){
      res.status(400).json({
         success:false,
         message:err.message
      });
   }
};

const login = async(req,res)=>{
    try{
       const {email,password} = req.body;

       const user = await userService.loginUser(email,password);

       const token = generateToken(user);

       res.json({
        success:true,
        token
       })
    }
    catch(err){
       res.status(401).json({
        success:false,
        message:err.message
       });
    }
};

const getUsers = async(req,res)=>{
   try{
      const users = await userService.getAllUser();

      res.json({
         success:true,
         data:users
      });
   }
   catch(err){
       res.status(500).json({
         success:false,
         message:err.message
       });
   }
};

module.exports = {login,getUsers,createUser};