const dashboardService = require('../services/dashboardService.js');

const getDashboard = async (req,res)=>{
  
    try{
        console.log(req.user.id);
        const data = await dashboardService.getDashboardData(req.user.id);

        res.json({
            success:true,
            data
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
};

module.exports = {getDashboard};