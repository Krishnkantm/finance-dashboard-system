const User = require('../models/User.js');
const bcrypt = require('bcryptjs');


const createUser = async (userData) => {
    const { name, email, password, role } = userData;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role
    });

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