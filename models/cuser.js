const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CUser = new Schema({
  FullName: {
    type: String
  },
  Email: {
    type: String
  },
  ID: {
    type: String,
    required: true
  },
  Key: {
    type: String,
    required: true
  }
});
module.exports = User = mongoose.model("CUser", CUser);
