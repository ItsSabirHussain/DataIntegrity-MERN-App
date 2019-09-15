const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load input validation
const validateCUserRegistration = require("../validation/cuserreg");
const validateCUserLogin = require("../validation/cuserlogin");

// Load User model
const CUser = require("../models/cuser");

// @route POST /userregistration
// @desc Register user
// @access Public
router.post("/cuserreg", (req, res) => {
  // Form validation
  const { errors, isValid } = validateCUserRegistration(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  CUser.findOne({ ID: req.body.ID }).then(user => {
    if (user) {
      return res.status(400).json({ ID: "ID already exists" });
    } else {
      const newCUser = new CUser({
        FullName: req.body.FullName,
        Email: req.body.Email,
        ID: req.body.ID,
        Key: req.body.Key
      });
      // Hash key before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newCUser.Key, salt, (err, hash) => {
          console.log(err);
          if (err) throw err;
          newCUser.Key = hash;
          newCUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST /userlogin
// @desc Login user and return JWT token
// @access Public
router.post("/cuserlogin", (req, res) => {
  // Form validation
  const { errors, isValid } = validateCUserLogin(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const ID = req.body.ID;
  const Key = req.body.Key;
  // Find user by id
  CUser.findOne({ ID: req.body.ID }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ IDNotFound: "ID not found" });
    }
    // Check password
    bcrypt.compare(Key, user.Key).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          ID: user.ID
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

router.post("/getcuser", (req, res) => {
  const ID = req.body.ID;
  console.log(ID);

  CUser.findOne({ ID: req.body.ID }).then(user => {
    if (!user) {
      return res.status(404).json({ IDNotFound: "ID not found" });
    }
    return res.json(user);
  });
});

module.exports = router;
