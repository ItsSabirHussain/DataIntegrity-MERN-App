const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EMP = new Schema({
  FullName: {
    type: String
  },
  OfficeID: {
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
module.exports = User = mongoose.model("EMP", EMP);
