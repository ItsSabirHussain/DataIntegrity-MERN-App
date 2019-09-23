const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Modifications = new Schema({
  ProjectName: {
    type: String
  },
  ID: {
    type: String
  },
  Updations: {
    type: String
  }
});
module.exports = User = mongoose.model("Modifications", Modifications);
