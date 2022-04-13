const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const liveDataSchema = new Schema({
    deviceId: {
        type: String
    },
    I: {
        type: String
    },
    ST: {
        type: Date
    },
    ET: {
        type: Date
    },
    D: {
        type: Number
    }
});

var live_data = mongoose.model("live_data", liveDataSchema);
module.exports = live_data;