const Record = require('../models/Record.js');
const User = require('../models/User.js');
const mongoose = require('mongoose');

const getDashboardData = async (userId) => {

    const currentUser = await User.findById(userId);

    let matchFilter = {};

    if (currentUser.role === "viewer") {
        matchFilter.user = new mongoose.Types.ObjectId(userId);
    }

    const income = await Record.aggregate([
        {
            $match: {
                ...matchFilter,
                type: "income",
                isDeleted: false
            }
        },
        {
            $group: {
                _id: null,
                total: { $sum: "$amount" }
            }
        }
    ]);

    const expense = await Record.aggregate([
        {
            $match: {
                ...matchFilter,
                type: "expense",
                isDeleted: false
            }
        },
        {
            $group: {
                _id: null,
                total: { $sum: "$amount" }
            }
        }
    ]);

    const totalIncome = income[0]?.total || 0;
    const totalExpense = expense[0]?.total || 0;
    const netBalance = totalIncome - totalExpense;

    const categoryWise = await Record.aggregate([
        {
            $match: {
                ...matchFilter,
                isDeleted: false
            }
        },
        {
            $group: {
                _id: "$category",
                total: { $sum: "$amount" }
            }
        }
    ]);

    const recentTransactions = await Record.find({
        ...matchFilter,
        isDeleted: false
    })
        .sort({ date: -1 })
        .limit(5);

    const monthlyTrends = await Record.aggregate([
        {
            $match: {
                ...matchFilter,
                isDeleted: false
            }
        },
        {
            $group: {
                _id: { $month: "$date" },
                total: { $sum: "$amount" }
            }
        }
    ]);

    return {
        totalIncome,
        totalExpense,
        netBalance,
        categoryWise,
        recentTransactions,
        monthlyTrends
    };
};

module.exports = { getDashboardData };