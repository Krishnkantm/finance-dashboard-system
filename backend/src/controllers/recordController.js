const recordService = require('../services/recordService.js');

//create record
const createRecord = async (req,res)=>{
    try{

        if(!req.body.amount || !req.body.type){
         return res.status(400).json({
            success:false,
            message:"Amount and type are required"
         });
        }

       const record = await recordService.createRecord(req.body,req.user.id);

       res.status(200).json({
        success:true,
        data:record
       });
    }
    catch(err){
       res.status(400).json({
        success:false,
        message:err.message
       });
    }
};

//get record
const getRecords = async (req,res)=>{
    try{
        const record = await recordService.getRecords(req.user.id,req.query);

        res.json({
            success:true,
            data:record
        });
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"something went wrong"
        });
    }
};

const updateRecord = async(req,res)=>{
    try{
        const record = await recordService.updateRecord(
            req.params.id,
            req.user.id,
            req.body
        );

        res.json({
            success:true,
            data:record
        });
    }
    catch(error){
       res.status(400).json({
             success:false,
             message:error.message
       });
    }
};

const deleteRecord = async(req,res)=>{
    try{
         await recordService.deleteRecord(
            req.params.id,
            req.user.id
         );

         res.json({
            success:true,
            message:"delete sucessfull"
         })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        });
    }
};

module.exports = {getRecords,createRecord,updateRecord,deleteRecord};