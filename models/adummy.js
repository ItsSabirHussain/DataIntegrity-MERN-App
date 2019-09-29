const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ADummy = new Schema({
  FullName: {
    type: String
  },
  Email: {
    type: String
  },
  ID: {
    type: String
  },
  Key: {
    type: String
  },
  Address: {
    type: String
  },
  Phone: {
    type: String
  },
  Company: {
    type: String
  },
  Nationality: {
    type: String
  }
});
module.exports = User = mongoose.model("ADummy", ADummy);
