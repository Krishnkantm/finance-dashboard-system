const generateToken = require('../utils/generateToken.js');
const userService = require('../services/userService.js');

const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        const statusCode =
            err.message === "User already exists" ? 409 : 400;

        res.status(statusCode).json({
            success: false,
            message: err.message
        });
    }
};

const login = async(req,res)=>{
    try{
       const {email,password} = req.body;

       const user = await userService.loginUser(email,password);

       const token = generateToken(user);

       res.json({
       success: true,
       token,
       user: {
         _id: user._id,
         name: user.name,
         email: user.email,
         role: user.role,
         isActive: user.isActive,
       },
      });
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