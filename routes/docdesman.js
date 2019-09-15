const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load input validation
const validateDocDesManRegistration = require("../validation/docdesmanreg");
const validateDocDesManLogin = require("../validation/docdesmanlogin");

// Load User model
const DocDesMan = require("../models/docdesman");

// @route POST /userregistration
// @desc Register user
// @access Public
router.post("/docdesmanreg", (req, res) => {
  DocDesMan.findOne({ ID: req.body.ID }).then(user => {
    if (user) {
      return res.status(400).json({ ID: "ID already exists" });
    } else {
      const newDocDesMan = new DocDesMan({
        FullName: req.body.FullName,
        OfficeID: req.body.OfficeID,
        ID: req.body.ID,
        Key: req.body.Key
      });
      // Hash key before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newDocDesMan.Key, salt, (err, hash) => {
          console.log(err);
          if (err) throw err;
          newDocDesMan.Key = hash;
          newDocDesMan
            .save()
            .then(user => res.json(user))
            .catch();
        });
      });
    }
  });
});

// @route POST /userlogin
// @desc Login user and return JWT token
// @access Public
router.post("/docdesmanlogin", (req, res) => {
  // Form validation
  const { errors, isValid } = validateDocDesManLogin(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const ID = req.body.ID;
  const Key = req.body.Key;
  // Find user by id
  DocDesMan.findOne({ ID: req.body.ID }).then(docdesman => {
    // Check if user exists
    if (!docdesman) {
      return res.status(404).json({ IDNotFound: "ID not found" });
    }
    // Check password
    bcrypt.compare(Key, docdesman.Key).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: docdesman.id,
          ID: docdesman.ID
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({ keyincorrect: "Key incorrect" });
      }
    });
  });
});

router.post("/getdocdesman", (req, res) => {
  const ID = req.body.ID;
  console.log(ID);

  DocDesMan.findOne({ ID: req.body.ID }).then(user => {
    if (!user) {
      return res.status(404).json({ IDNotFound: "ID not found" });
    }
    return res.json(user);
  });
});

module.exports = router;
