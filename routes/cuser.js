const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const CUser = require("../models/cuser");
const Notifications = require("../models/notifications");
const Modifications = require("../models/modications");
const ProjectInfo = require("../models/projectinfo");
const BidStatus = require("../models/bidstatus");

router.post("/cuserreg", (req, res) => {
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

router.post("/cuserlogin", (req, res) => {
  const ID = req.body.ID;
  const Key = req.body.Key;
  CUser.findOne({ ID: req.body.ID }).then(user => {
    if (!user) {
      return res.status(404).json({ IDNotFound: "ID not found" });
    }
    bcrypt.compare(Key, user.Key).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          ID: user.ID
        };
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
        new Notifications({
          ID: req.body.ID,
          Role: "CUser",
          Content: req.body.ID + " is loged in."
        }).save();
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

router.post("/modifications", (req, res) => {
  const ID = req.body.ID;
  new Modifications({
    ID: req.body.ID,
    ProjectName: req.body.ProjectName,
    Updations: req.body.Updations
  })
    .save()
    .then(err => {
      new Notifications({
        ID: req.body.ID,
        CompanyName: req.body.CompanyName,
        ProjectName: req.body.ProjectName,
        Content: "Modifications added."
      }).save();
      res.json({ message: "Succeed" });
    })
    .catch(err => {
      res.json({ message: "Error" });
    });
});

router.post("/uploadproject", (req, res) => {
  console.log(req.body);
  new ProjectInfo({
    CompanyName: req.body.CompanyName,
    ProjectName: req.body.ProjectName,
    ProjectDescription: req.body.ProjectDesc,
    City: req.body.City,
    State: req.body.State,
    Date: req.body.Date,
    Budget: req.body.Budget,
    Zip: req.body.Zip,
    Country: req.body.Country,
    ID: req.body.ID
  })

    .save()
    .then(err => {
      new Notifications({
        ID: req.body.ID,
        CompanyName: req.body.CompanyName,
        ProjectName: req.body.ProjectName,
        Content: "New Project Uploaded."
      }).save();
      res.json({ message: "Succeed" });
    })
    .catch(err => {
      res.json({ message: "Error" });
    });
});

router.post("/addnotification", (req, res) => {
  new Notifications({
    ID: req.body.ID,
    CompanyName: req.body.CompanyName,
    ProjectName: req.body.ProjectName,
    Content: req.body.Content
  })
    .save()
    .then(r => {
      res.json({ message: "OK" });
    })
    .catch(err => {
      res.json({ message: "Error" });
    });
});

router.post("/getbidstatus", (req, res) => {
  BidStatus.find()
    .then(projects => {
      console.log("There");
      if (projects) {
        return res.json(projects);
      } else {
        return res.json([
          {
            CompanyName: "None",
            ProjectName: "None",
            Bid: "None",
            Reason: "None"
          }
        ]);
      }
    })
    .catch(err => {
      res.json({ message: "Error" });
    });
});

module.exports = router;
