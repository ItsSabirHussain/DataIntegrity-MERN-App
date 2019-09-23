const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BidStatus = new Schema({
  ID: {
    type: String
  },
  ProjectName: {
    type: String
  },
  CompanyName: {
    type: String
  },
  Bid: {
    type: String
  },
  Reason: {
    type: String
  },
  Status: {
    type: String
  }
});
module.exports = User = mongoose.model("BidStatus", BidStatus);
