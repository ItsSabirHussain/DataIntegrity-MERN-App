import React, { useState, useEffect } from "react";
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
      <Link to="/" style={{ textDecoration: "none" }}>
        The website{" "}
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

export default function Update(props) {
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState({
    _id: "",
    FullName: "",
    ID: "",
    Email: "",
    Key: "",
    Address: "",
    Phone: "",
    Company: "",
    Nationality: ""
  });
  useEffect(() => {
    if (userInfo.FullName === "") {
      axios
        .post("/getcuser", { _id: localStorage.getItem("_id") })
        .then(res => {
          setUserInfo({
            _id: res.body._id,
            FullName: res.data.FullName,
            ID: res.data.ID,
            Email: res.data.Email,
            Key: res.data.Key,
            Address: res.data.Address,
            Phone: res.data.Phone,
            Company: res.data.Company,
            Nationality: res.data.Nationality
          });
        })
        .catch(error => console.log(error));
    }
  });

  const onClick = e => {
    e.preventDefault();
    axios
      .post("/update", userInfo)
      .then(res => {
        props.history.push("/cuserdashboard");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Client User Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="Name"
                variant="outlined"
                required
                fullWidth
                id="Name"
                label={"Name: " + userInfo.FullName}
                autoFocus
                onChange={e =>
                  setUserInfo({ ...userInfo, FullName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="ID"
                label={"ID: " + userInfo.ID}
                name="ID"
                autoComplete="ID"
                onChange={e => setUserInfo({ ...userInfo, ID: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Email"
                label={"Email: " + userInfo.Email}
                name="Email"
                autoComplete="email"
                onChange={e =>
                  setUserInfo({ ...userInfo, Email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="ID"
                label={"Address: " + userInfo.Address}
                name="Address"
                autoComplete="Address"
                onChange={e =>
                  setUserInfo({ ...userInfo, Address: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="ID"
                label={"Phone: " + userInfo.Phone}
                name="Address"
                autoComplete="Address"
                onChange={e =>
                  setUserInfo({ ...userInfo, Phone: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="ID"
                label={"Company: " + userInfo.Company}
                name="Address"
                autoComplete="Address"
                onChange={e =>
                  setUserInfo({ ...userInfo, Company: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="ID"
                label={"Nationality: " + userInfo.Nationality}
                name="Address"
                autoComplete="Address"
                onChange={e =>
                  setUserInfo({ ...userInfo, Nationality: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Key"
                label="Key"
                type="password"
                id="Key"
                autoComplete="current-Key"
                onChange={e =>
                  setUserInfo({ ...userInfo, Key: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onClick}
          >
            Update
          </Button>
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
