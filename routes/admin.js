const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const Admin = require("../models/admin");
const ADummy = require("../models/adummy");

router.post("/promanlogin", (req, res) => {
  Admin.findOne({ ID: req.body.ID }).then(admin => {
    if (!admin) {
      return res.status(404).json({ IDNotFound: "ID not found" });
    }
    if ((req.body.Key = admin.Key)) {
      const payload = {
        id: admin.id,
        ID: admin.ID
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

router.post("/getproman", (req, res) => {
  const ID = req.body.ID;
  console.log(ID);

  Admin.findOne({ ID: req.body.ID }).then(user => {
    if (!user) {
      return res.status(404).json({ IDNotFound: "ID not found" });
    }
    return res.json(user);
  });
});

router.post("/aupdate", (req, res) => {
  new ADummy({
    _id: req.body._id,
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
        return res.status(404).json({ ERROR: "No added" });
      }
    })
    .catch(err => {
      res.json({ Err: "Error" });
    });
});

router.post("/cupdate", (req, res) => {
  new UNotifications({
    Date: req.body.Date,
    Content: req.body.Content
  }).save();

  new ANotifications({
    Date: req.body.Date,
    Content: req.body.Content
  }).save();
  CUser.findOne({ _id: req.body._id }).then(user => {
    (user.FullName = req.body.FullName),
      (user.Email = req.body.Email),
      (user.ID = req.body.ID),
      (user.Key = req.body.Key),
      (user.Address = req.body.Address),
      (user.Phone = req.body.Phone),
      (user.Company = req.body.Company),
      (user.Nationality = req.body.Nationality);
    user

      .save()
      .then(user => {
        if (!user) {
          return res.status(404).json({ ERROR: "No added" });
        }
      })
      .catch(err => {
        res.json({ Err: "Error" });
      });
  });
});

router.post("/getcupdate", (req, res) => {
  ADummy.find()
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
