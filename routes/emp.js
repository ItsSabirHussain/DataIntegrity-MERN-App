const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const EMP = require("../models/emp");
const ANotifications = require("../models/anotifications");
const UNotifications = require("../models/unotifications");
const Dummy = require("../models/dummy");

router.post("/ceoreg", (req, res) => {
  EMP.findOne({ ID: req.body.ID }).then(ceo => {
    console.log(ceo);
    if (ceo) {
      return res.status(400).json({ ID: "ID already exists" });
    } else {
      const newCEO = new EMP({
        FullName: req.body.FullName,
        OfficeID: req.body.OfficeID,
        ID: req.body.ID,
        Key: req.body.Key
      });
      newCEO
        .save()
        .then(ceo => res.json(newCEO))
        .catch(err => console.log(err));
    }
  });
});

router.post("/ceologin", (req, res) => {
  EMP.findOne({ ID: req.body.ID }).then(ceo => {
    if (!ceo) {
      return res.status(404).json({ IDNotFound: "ID not found" });
    }
    if ((req.body.Key = isMatch.Key)) {
      const payload = {
        id: ceo.id,
        ID: ceo.ID
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
    } else {
      return res.status(400).json({ passwordincorrect: "Key incorrect" });
    }
  });
});

router.post("/getceo", (req, res) => {
  const ID = req.body.ID;
  console.log(ID);

  EMP.findOne({ ID: req.body.ID }).then(user => {
    if (!user) {
      return res.status(404).json({ IDNotFound: "ID not found" });
    }
    return res.json(user);
  });
});

router.post("/getanotifications", (req, res) => {
  Notification.find()
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

router.post("/getanalysisdata", (req, res) => {
  ProjectAnalysis.find()
    .then(noti => {
      if (noti) {
        return res.json(noti);
      } else {
        return res.json({
          ID: "None",
          ProjectName: "None",
          CompanyName: "None",
          Suggestions: "None",
          Cost: "None",
          Budget: "None",
          RistFactor: "None",
          Action: "None"
        });
      }
    })
    .catch(err => {
      res.json({ message: "Error" });
    });
});

router.post("/getadata", (req, res) => {
  ProjectAnalysis.findOne({ _id: req.body._id })
    .then(noti => {
      if (noti) {
        return res.json(noti);
      } else {
        return res.json({
          ID: "None",
          ProjectName: "None",
          CompanyName: "None",
          Suggestions: "None",
          Cost: "None",
          Budget: "None",
          RistFactor: "None",
          Action: "None"
        });
      }
    })
    .catch(err => {
      res.json({ message: "Error" });
    });
});

router.post("/getanoti", (req, res) => {
  ANotifications.find()
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

router.post("/updatebidstatus", (req, res) => {
  new BidStatus({
    ID: req.body.ID,
    ProjectName: req.body.ProjectName,
    CompanyName: req.body.CompanyName,
    Bid: req.body.Bid,
    Reason: req.body.Reason,
    Status: req.body.Status
  })
    .save()
    .then(r => {
      res.json({ message: "Done" });
    })
    .catch(err => {
      res.json({ message: "Error" });
    });
});

router.post("/update", (req, res) => {
  new Dummy({
    FullName: req.body.FullName,
    Email: req.body.Email,
    ID: req.body.ID,
    Key: req.body.Key,
    Address: req.body.Address,
    Phone: req.body.Phone,
    Company: req.body.Company,
    Nationality: req.body.Nationality
  })
    .save()
    .then(user => {
      if (!user) {
        return res.status(404).json({ ERROR: "Not added" });
      }
    })
    .catch(err => {
      res.json({ Err: "Error" });
    });
});

router.post("/aunoti", (req, res) => {
  new UNotifications({
    Date: req.body.Date,
    Content: req.body.Content
  }).save();

  new ANotifications({
    Date: req.body.Date,
    Content: req.body.Content
  }).save();
});

router.post("/getdupdate", (req, res) => {
  Dummy.find()
    .then(noti => {
      if (noti) {
        return res.json(noti);
      } else {
        return res.json([
          {
            FullName: "None",
            Email: "None",
            ID: "None",
            Key: "None",
            Address: "None",
            Phone: "None",
            Company: "None",
            Nationality: "None"
          }
        ]);
      }
    })
    .catch(err => {
      res.json({ message: "Error" });
    });
});

module.exports = router;
