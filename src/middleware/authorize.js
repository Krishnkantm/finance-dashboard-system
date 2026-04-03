const authorize = (...allowedRoles)=>{
    return (req,res,next) =>{
        try{
          
            if(!req.user){
                return res.status(401).json({
                    success:false,
                    message: "Unauthorized: No user found"
                });
            }
             
            if(!allowedRoles.includes(req.user.role)){
                return res.status(403).json({
                    success:false,
                    message:"Forbidden : You do not have access"
                });
            }

            next();
        }
        catch(err){
            return res.status(500).json({
                success:false,
                message:err.message
            })
        }
    }
};

module.exports = authorize;