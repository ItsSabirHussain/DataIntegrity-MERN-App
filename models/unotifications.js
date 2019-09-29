const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UNotifications = new Schema({
  Date: {
    type: String
  },
  Content: {
    type: String
  }
});
module.exports = User = mongoose.model("UNotifications", UNotifications);
