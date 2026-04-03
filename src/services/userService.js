const User = require('../models/User.js');
const bcrypt = require('bcryptjs');

const createUser = async(data)=>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password,salt);

    data.password = hashedPassword;

    const user = await User.create(data);
    return user;
};

const loginUser = async(email,password)=>{
    const user = await User.findOne({email});

    if(!user){
        throw new Error("User not found");
    }
    
    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        throw new Error("Invalid credentials");
    }

    if(!user.isActive){
        throw new Error("User account is inactive")
    }

    return user;
};

const getAllUser = async()=>{
   return await User.find().select('-password');
}

module.exports = {createUser,loginUser,getAllUser};