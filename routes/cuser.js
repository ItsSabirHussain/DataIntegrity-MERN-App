const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const CUser = require("../models/cuser");
const ANotifications = require("../models/anotifications");
const UNotifications = require("../models/unotifications");

router.post("/cuserreg", (req, res) => {
  new ANotifications({
    Date: new Date(),
    Content: "New User Registered."
  }).save();

  CUser.findOne({ ID: req.body.ID }).then(user => {
    if (user) {
      return res.status(400).json({ ID: "ID already exists" });
    } else {
      const newCUser = new CUser({
        FullName: req.body.FullName,
        Email: req.body.Email,
        ID: req.body.ID,
        Key: req.body.Key,
        Address: req.body.Address,
        Phone: req.body.Phone,
        Company: req.body.Company,
        Nationality: req.body.Nationality
      });
      newCUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
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
    if (req.body.Key === user.Key) {
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
            _id: user._id,
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

router.post("/getcuser", (req, res) => {
  CUser.findOne({ _id: req.body._id }).then(user => {
    if (!user) {
      return res.status(404).json({ IDNotFound: "ID not found" });
    }
    return res.json(user);
  });
});

router.post("/searchbyid", (req, res) => {
  CUser.findOne({ _id: req.body._id }).then(user => {
    if (!user) {
      return res.status(404).json({ IDNotFound: "ID not found" });
    }
    return res.json(user);
  });
});

router.post("/searchbyname", (req, res) => {
  Notification.find({ FullName: req.body.FullName })
    .then(noti => {
      if (noti) {
        return res.json(noti);
      } else {
        return res.json({
          FullName: "",
          Email: "",
          ID: "",
          Key: "",
          Address: "",
          Phone: "",
          Company: "",
          Nationality: ""
        });
      }
    })
    .catch(err => {
      res.json({ message: "Error" });
    });
});

router.post("/getallusers", (req, res) => {
  CUser.find()
    .then(noti => {
      if (noti) {
        return res.json(noti);
      } else {
        return res.json({
          FullName: "None",
          Email: "None",
          ID: "None",
          Key: "None",
          Address: "None",
          Phone: "None",
          Company: "None",
          Nationality: "None"
        });
      }
    })
    .catch(err => {
      res.json({ message: "Error" });
    });
});

router.post("/getunoti", (req, res) => {
  UNotifications.find()
    .then(noti => {
      if (noti) {
        return res.json(noti);
      } else {
        return res.json([
          {
            Date: "None",
            Content: "None"
          }
        ]);
      }
    })
    .catch(err => {
      res.json({ message: "Error" });
    });
});

module.exports = router;
