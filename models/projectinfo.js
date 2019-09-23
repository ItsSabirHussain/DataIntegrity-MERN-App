const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectInfo = new Schema({
  ID: {
    type: String
  },
  CompanyName: {
    type: String
  },
  ProjectName: {
    type: String
  },
  ProjectDescription: {
    type: String
  },
  City: {
    type: String
  },
  State: {
    type: String
  },
  Zip: {
    type: String
  },
  Country: {
    type: String
  },
  Date: {
    type: String
  },
  Budget: {
    type: String
  }
});
module.exports = User = mongoose.model("ProjectInfo", ProjectInfo);
