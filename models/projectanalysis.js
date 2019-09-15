const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectAnalysis = new Schema({
  ProjectName: {
    type: String
  },
  ID: {
    type: String
  },
  Content: {
    type: String,
    required: true
  }
});
module.exports = User = mongoose.model("ProjectAnalysis", ProjectAnalysis);
