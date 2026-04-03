const Record = require('../models/Record.js');
const mongoose = require('mongoose');

//dashboard data
const getDashboardData = async(userId)=>{
   
    // 1 total income
    const income = await Record.aggregate([
        {$match : {user:new mongoose.Types.ObjectId(userId),type : 'income'}},
        {$group : {_id: null,total : {$sum: '$amount'}}}
    ]);

    // 2 total expense
    const expense = await Record.aggregate([
    {$match: {user:new mongoose.Types.ObjectId(userId),type:'expense'}},
    {$group : {_id: null, total:{$sum: '$amount'}}}
    ]);

    const totalIncome = income[0]?.total || 0;
    
    const totalExpense = expense[0]?.total || 0;

    // 3 net balance
    const netBalance = totalIncome - totalExpense;

    //4 category-wise totals
    const categoryWise = await Record.aggregate([
        {$match:{user:new mongoose.Types.ObjectId(userId)}},
        {
            $group:{
                _id:'$category',
                total:{$sum: '$amount'}
            }
        }
    ]);

    //5 recent transactions
    const recentTransactions = await Record.find(
        {user: new mongoose.Types.ObjectId(userId)}
    ).sort({date: -1}).limit(5);
    console.log("recent done");

    //6 month trends
    const monthlyTrends = await Record.aggregate([
        {$match:{user : new mongoose.Types.ObjectId(userId)}},
        {
            $group:{
                _id:{
                    $month : '$date'
                },
                total:{
                    $sum : '$amount'
                }
            }
        }
    ]);
    
    return{
        totalIncome,
        totalExpense,
        netBalance,
        categoryWise,
        recentTransactions,
        monthlyTrends
    };
};

module.exports = {getDashboardData};