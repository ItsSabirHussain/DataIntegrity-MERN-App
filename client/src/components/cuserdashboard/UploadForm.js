import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import validator from "validator";

const uploadButton = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 20
  }
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

export default function UploadForm(props) {
  const [prodata, setProdata] = useState({
    ID: localStorage.getItem("cuserID"),
    CompanyName: "",
    ProjectName: "",
    ProjectDesc: "",
    City: "",
    State: "",
    Zip: "",
    Country: "",
    Date: "",
    Budget: ""
  });
  const classes = useStyles();
  const uButton = uploadButton();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = e => {
    console.log(prodata.ID);
    e.preventDefault();
    if (validator.isEmpty(prodata.CompanyName)) {
      alert("Company Name Must Required");
    } else if (validator.isEmpty(prodata.ProjectName)) {
      alert("Project Name Must Required");
    } else if (validator.isEmpty(prodata.ProjectDesc)) {
      alert("Project Description Must Required");
    } else if (validator.isEmpty(prodata.City)) {
      alert("City Must Required");
    } else if (validator.isEmpty(prodata.State)) {
      alert("State Must Required");
    } else if (validator.isEmpty(prodata.Zip)) {
      alert("Zip Must Required");
    } else if (validator.isEmpty(prodata.Country)) {
      alert("Country Must Required");
    } else if (validator.isEmpty(prodata.Date)) {
      alert("Date Must Required");
    } else if (validator.isEmpty(prodata.Budget)) {
      alert("Budget Must Required");
    } else {
      axios
        .post("/uploadproject", prodata)
        .then(res => {
          props.history.push("/cuserdashboard");
        })
        .catch(error => {
          alert("Error occur check you information and try again.");
        });
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <br></br>
      <CssBaseline />
      <br></br>
      <main className={classes.layout}>
        <br></br>
        <Paper className={classes.paper}>
          <br></br>
          <br></br>
          <br></br>
          <Typography top="5" component="h1" variant="h4" align="center">
            Upload Project
          </Typography>
          <br></br>
          <br></br>
          <React.Fragment>
            <Typography variant="h5" gutterBottom>
              Project Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="companyname"
                  name="companyname"
                  label="Company Name"
                  fullWidth
                  autoComplete="cname"
                  onChange={e => {
                    setProdata({ ...prodata, CompanyName: e.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="projectname"
                  name="projectname"
                  label="Project Name"
                  fullWidth
                  autoComplete="pname"
                  onChange={e => {
                    setProdata({ ...prodata, ProjectName: e.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="projectdescription"
                  name="projectdescription"
                  label="Project Description Line 1"
                  fullWidth
                  autoComplete="pdescription"
                  onChange={e => {
                    setProdata({ ...prodata, ProjectDesc: e.target.value });
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="city"
                  onChange={e => {
                    setProdata({ ...prodata, City: e.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="state"
                  name="state"
                  label="State/Province/Region"
                  fullWidth
                  onChange={e => {
                    setProdata({ ...prodata, State: e.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zip"
                  name="zip"
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="zip"
                  onChange={e => {
                    setProdata({ ...prodata, Zip: e.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="country"
                  name="country"
                  label="Country"
                  fullWidth
                  autoComplete="country"
                  onChange={e => {
                    setProdata({ ...prodata, Country: e.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="deleverydate"
                  name="deleverydate"
                  label="Delevery Date (dd / mm / yyyy)"
                  fullWidth
                  autoComplete="ddate"
                  onChange={e => {
                    setProdata({ ...prodata, Date: e.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="budget"
                  name="budget"
                  label="Budget"
                  fullWidth
                  autoComplete="budget"
                  onChange={e => {
                    setProdata({ ...prodata, Budget: e.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          </React.Fragment>
          <React.Fragment>
            <Button
              variant="contained"
              color="default"
              className={uButton.button}
              type
            >
              Upload
              <CloudUploadIcon className={uButton.rightIcon} />
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={uButton.button}
            >
              Submit
            </Button>
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}
