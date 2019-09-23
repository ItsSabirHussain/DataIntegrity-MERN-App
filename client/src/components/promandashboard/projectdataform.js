import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link to="/promandashboard" style={{ textDecoration: "none" }}>
        Dashboard{" "}
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function ProjectDataForm(props) {
  const classes = useStyles();
  const [proInfo, setProInfo] = useState({
    ProjectName: "",
    ID: "",
    Suggestion: "",
    Cost: "",
    RiskFactor: "",
    CompanyName: ""
  });

  const onClick = e => {
    e.preventDefault();
    axios
      .post("/uploadanalysisdata", proInfo)
      .then(res => {
        alert("Added please do another one.");
      })
      .catch(error => {
        alert(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Analysis Data
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="projectname"
                variant="outlined"
                required
                fullWidth
                id="project name"
                label="Project Name"
                autoFocus
                onChange={e =>
                  setProInfo({ ...proInfo, ProjectName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="projectname"
                variant="outlined"
                required
                fullWidth
                id="project name"
                label="Company Name"
                autoFocus
                onChange={e =>
                  setProInfo({ ...proInfo, CompanyName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="uID"
                label="User ID"
                name="ID"
                autoComplete="ID"
                onChange={e => setProInfo({ ...proInfo, ID: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="suggestion"
                label="Suggestion"
                name="suggestion"
                autoComplete="suggestion"
                onChange={e =>
                  setProInfo({ ...proInfo, Suggestion: e.target.value })
                }
              />
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="suggestion"
                  label="Cost"
                  name="suggestion"
                  autoComplete="suggestion"
                  onChange={e =>
                    setProInfo({ ...proInfo, Cost: e.target.value })
                  }
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="suggestion"
                label="Risk Factor"
                name="suggestion"
                autoComplete="suggestion"
                onChange={e =>
                  setProInfo({ ...proInfo, RiskFactor: e.target.value })
                }
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onClick}
            >
              Submit
            </Button>
          </Grid>

          <Grid container justify="flex-end">
            <Grid item></Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
