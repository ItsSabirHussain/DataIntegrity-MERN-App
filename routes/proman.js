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
const ProjectAnalysis = require("../models/projectanalysis");
const ProCost = require("../models/procost");
const Notification = require("../models/notifications");
const ProjectInfo = require("../models/projectinfo");
const Modifications = require("../models/modications");

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

router.post("/getproman", (req, res) => {
  const ID = req.body.ID;
  console.log(ID);

  ProMan.findOne({ ID: req.body.ID }).then(user => {
    if (!user) {
      return res.status(404).json({ IDNotFound: "ID not found" });
    }
    return res.json(user);
  });
});

router.post("/uploadanalysisdata", (req, res) => {
  ProjectInfo.findOne({
    ID: req.body.ID,
    ProjectName: req.body.ProjectName
  }).then(ff => {
    console.log(ff);
    const newData = new ProjectAnalysis({
      ProjectName: req.body.ProjectName,
      ID: req.body.ID,
      Suggestion: req.body.Suggestion,
      Cost: req.body.Cost,
      RiskFactor: req.body.RiskFactor,
      CompanyName: req.body.CompanyName,
      Budget: ff.Budget
    });
    newData
      .save()
      .then(s => {
        console.log(s);

        res.json({ message: "Succeded" });
      })
      .catch(err => {
        console.log(err);
        res.json({ message: err });
      });
  });
});

router.post("/uploadprocost", (req, res) => {
  ProCost.findOne({ ID: req.body.ID }).then(proman => {
    if (proman) {
      return res.status(400).json({ ID: "ID already exists" });
    } else {
      const newData = new ProCost({
        ProjectName: req.body.ProjectName,
        ID: req.body.ID,
        Cost: req.body.Suggetion
      });
      newData.save();
    }
  });
});

router.post("/getcreq", (req, res) => {
  ProMan.find({}, { _id: false }).then(user => {
    if (!user) {
      return res.status(404).json({ IDNotFound: "ID not found" });
    }
    return res.json(user);
  });
});

router.post("/getnotifications", (req, res) => {
  Notification.find()
    .then(noti => {
      if (noti) {
        return res.json(noti);
      } else {
        return res.json({
          ID: "None",
          ProjectName: "None",
          CompanyName: "None",
          Content: "None"
        });
      }
    })
    .catch(err => {
      res.json({ message: "Error" });
    });
});
router.post("/getprojects", (req, res) => {
  ProjectInfo.find()
    .then(projects => {
      console.log("There");
      if (projects) {
        return res.json(projects);
      } else {
        return res.json([
          {
            CompanyName: "None",
            ProjectName: "None",
            ProjectDescription: "None",
            City: "None",
            State: "None",
            Date: "None",
            Budget: "None",
            Zip: "None",
            Country: "None",
            ID: "None"
          }
        ]);
      }
    })
    .catch(err => {
      res.json({ message: "Error" });
    });
});

router.post("/getmodifications", (req, res) => {
  Modifications.find()
    .then(updations => {
      if (updations) {
        return res.json(updations);
      } else {
        return res.json([
          {
            CompanyName: "None",
            ProjectName: "None",
            Updations: "None"
          }
        ]);
      }
    })
    .catch(err => {
      res.json({ message: "Error" });
    });
});

module.exports = router;
