const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    amount:{
        type:Number,
        required:[true,"Amount is required"],
        min:[0,"Amount must be positive"]
    },
    type:{
        type:String,
        enum:['income','expense'],
        required:[true,"Type is required"]
    },
    category:{
      type:String,
      required:[true,"Category is required"],
      trim:true
    },
    date:{
        type:Date,
        required:[true,"Date is required"]
    },
    isDeleted:{
       type:Boolean,
       default:false
    },
    note:{
        type:String,
        trim:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{
    timestamps:true
});

module.exports = mongoose.model('Record',recordSchema);