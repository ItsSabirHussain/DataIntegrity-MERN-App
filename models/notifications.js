const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Notifications = new Schema({
  ID: {
    type: String
  },
  Role: {
    type: String
  },
  Content: {
    type: String,
    required: true
  }
});
module.exports = User = mongoose.model("Notifications", Notifications);
