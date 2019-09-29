const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ANotifications = new Schema({
  Date: {
    type: String
  },
  Content: {
    type: String
  }
});
module.exports = User = mongoose.model("ANotifications", ANotifications);
