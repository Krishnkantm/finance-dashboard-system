const Record = require("../models/Record.js");

const createRecord = async (data, userId) => {
  data.user = userId;

  const record = await Record.create(data);

  return record;
};


const getRecords = async (query) => {
  const filter = {
    isDeleted: false,
  };


  if (query.type) {
    filter.type = query.type;
  }

  if (query.category) {
    filter.category = query.category;
  }

 
  if (query.startDate && query.endDate) {
    filter.date = {
      $gte: new Date(query.startDate),
      $lte: new Date(query.endDate),
    };
  }

  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;

  const records = await Record.find(filter)
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Record.countDocuments(filter);

  return {
    records,
    page,
    totalPages: Math.ceil(total / limit),
    totalRecords: total,
  };
};

const updateRecord = async (recordId, data) => {
  const record = await Record.findById(recordId);

  if (!record) {
    throw new Error("Record not found");
  }

  Object.assign(record, data);

  await record.save();

  return record;
};

const deleteRecord = async (recordId) => {
  const record = await Record.findByIdAndUpdate(
    recordId,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );

  if (!record) {
    throw new Error("Record not found");
  }

  return record;
};

module.exports = {
  getRecords,
  createRecord,
  updateRecord,
  deleteRecord,
};