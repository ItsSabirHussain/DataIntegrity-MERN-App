const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Notifications = new Schema({
  ID: {
    type: String
  },
  CompanyName: {
    type: String
  },
  ProjectName: {
    type: String
  },
  Content: {
    type: String
  }
});
module.exports = User = mongoose.model("Notifications", Notifications);
