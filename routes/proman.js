const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load input validation
const validateProManRegistration = require("../validation/promanreg");
const validateProManLogin = require("../validation/promanlogin");

// Load User model
const ProMan = require("../models/proman");

// @route POST /adminregisteration
// @desc Register user
// @access Public
router.post("/promanreg", (req, res) => {
  // Form validation
  const { errors, isValid } = validateProManRegistration(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  console.log("There");
  ProMan.findOne({ ID: req.body.ID }).then(proman => {
    if (proman) {
      return res.status(400).json({ ID: "ID already exists" });
    } else {
      const newProMan = new ProMan({
        FullName: req.body.FullName,
        OfficeID: req.body.OfficeID,
        ID: req.body.ID,
        Key: req.body.Key
      });

      console.log(newProMan);

      // Hash key before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newProMan.Key, salt, (err, hash) => {
          console.log(err);
          if (err) throw err;
          newProMan.Key = hash;
          newProMan
            .save()
            .then(admin => res.json(newProMan))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST /adminlogin
// @desc Login admin and return JWT token
// @access Public
router.post("/promanlogin", (req, res) => {
  // Form validation
  const { errors, isValid } = validateProManLogin(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const ID = req.body.ID;
  const Key = req.body.Key;
  // Find admin by id
  ProMan.findOne({ ID: req.body.ID }).then(admin => {
    // Check if admin exists
    if (!admin) {
      return res.status(404).json({ IDNotFound: "ID not found" });
    }
    // Check password
    bcrypt.compare(Key, admin.Key).then(isMatch => {
      if (isMatch) {
        // Admin matched
        // Create JWT Payload
        const payload = {
          id: admin.id,
          ID: admin.ID
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
        return res.status(400).json({ passwordincorrect: "Key incorrect" });
      }
    });
  });
});

module.exports = router;
