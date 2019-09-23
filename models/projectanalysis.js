const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectAnalysis = new Schema({
  ProjectName: {
    type: String
  },
  CompanyName: {
    type: String
  },
  Budget: {
    type: String
  },
  ID: {
    type: String
  },
  Suggestion: {
    type: String
  },
  Cost: {
    type: String
  },
  RiskFactor: {
    type: String
  }
});
module.exports = User = mongoose.model("ProjectAnalysis", ProjectAnalysis);
