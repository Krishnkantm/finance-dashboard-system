const Record = require('../models/Record.js');

//create record 
const createRecord = async (data,userId)=>{
    data.user = userId;
    
    const record = await Record.create(data);

    return record;
};

//get record with filter
const getRecords = async(userId,query)=>{
    const filter = {
        user: userId,
        isDeleted:false
    };

    //filter by type
    if(query.type){
        filter.type = query.type;
    }

    //filter by category
    if(query.category){
        filter.category = query.category;
    }

    //filter by date
    if(query.startDate && query.endDate){
        filter.date = {
            $gte: new Date(query.startDate),
            $lte: new Date(query.endDate)
        };
    }

    //pagination
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 5;
    const skip = (page-1) * limit;

    const records = await Record.find(filter).sort({date: -1}).skip(skip).limit(limit);
    const total = await Record.countDocuments(filter);

    return {
        records,
        page,
        totalPages:Math.ceil(total/limit)
    };
};

const updateRecord = async (recordId,userId,data)=>{
  const record = await Record.findOne({
    _id:recordId,
    user:userId
  });

  if(!record){
    throw new Error("Record not found or unauthorized");
  }

  Object.assign(record,data);

  await record.save();

  return record;
}

const deleteRecord = async(recordId,userId)=>{
    const record = await Record.findOneAndDelete({
        _id:recordId,
        user:userId,
        isDeleted:false
    },{
        isDeleted:true
    },{
        new:true
    });

    if(!record){
        throw new Error("Record not found or unauthorized");
    }

    return record;
};

module.exports = {getRecords,createRecord,updateRecord,deleteRecord};
