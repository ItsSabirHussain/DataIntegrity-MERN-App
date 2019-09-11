const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");
const path = require("path");

const ceo = require("./routes/ceo");
const cuser = require("./routes/cuser");
const docdesman = require("./routes/docdesman");
const proman = require("./routes/proman");
const cors = require("cors");

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(cors());

// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/cuserpassport")(passport);
require("./config/ceopassport")(passport);
require("./config/promanpassport")(passport);
require("./config/docdesmanpassport")(passport);

// Routes
app.use("/", ceo);
app.use("/", cuser);
app.use("/", docdesman);
app.use("/", proman);

// For Heroku
if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "client/build"));
  app.get("*", (req, res) => {
    console.log(__filename);
    res.sendFile(path.resolve(__dirname + "/client/build/index.html")); // relative path
  });
}

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
