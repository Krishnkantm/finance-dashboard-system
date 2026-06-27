const dashboardService = require('../services/dashboardService.js');

const getDashboard = async (req,res)=>{
  
    try{

        const data = await dashboardService.getDashboardData(req.user.id);

        res.json({
            success:true,
            data
        });
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
};

module.exports = {getDashboard};