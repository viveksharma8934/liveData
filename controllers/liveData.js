const Data = require("../models/live_data");

module.exports = {
  getAllData: async (req, res, next) => {
    try {
      const results = await Data.find({}, { __v: 0 });
      res.send(results);
    } catch (err) {
      console.log(err.message);
    }
  },

  avgCount: async (req, res, next) => {
    try {
      // const results = await Data.find(
      //     {$match:{ST:{$gte: new Date("2022-03-19T12:10:48.000Z"), $lt: new Date("2022-04-10T14:55:08.000Z")}}},
      //     // {$group:{_id : {deviceId: "D00001", I: "IN1"},perHour : {$sum:"$count"}}},
      //     // {$sort:{perHour:1}}
      // )
      // const avg = await Data.find([{
      //     Count:{$sum:"$count"}
      // }]);

      // res.send(avg);
      const { time1, time2 } = req.body;
      console.log(time1);

      const results = await Data.aggregate([
        {
          $match: {
            deviceId: "D00001",
            I: "IN2",
            ST: { $gte: new Date(time1), $lt: new Date(time2) },
          },
        },
        { $group: { _id: null, totalCount: { $sum: "$D" } } },
      ]);
    //   res.send(results);

      const hours = await Data.aggregate([
        {
          $project: {
            _id:null,
            dateDifference: { $subtract: [new Date(time2), new Date(time1)] },
          },
        }
    ]);
    const totalHours = (hours[0].dateDifference/3600000);
    const avgCountPerHour = (results[0].totalCount / totalHours);
    res.json({avgCount:avgCountPerHour,TotalHour:totalHours,TotalCount:results[0].totalCount});
    console.log(hours[0].dateDifference);
    console.log(hours[0].dateDifference/3600000);
    } catch (err) {
      console.log(err.message);
    }
  },
};
