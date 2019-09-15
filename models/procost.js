const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProCost = new Schema({
  ID: {
    type: String
  },
  ProjectName: {
    type: String
  },
  Cost: {
    type: String
  }
});
module.exports = User = mongoose.model("ProCost", ProCost);
