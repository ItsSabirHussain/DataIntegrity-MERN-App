import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import { Link } from "react-router-dom";

import Homenavs from "./homenav";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Your Website and Your Name Here.
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: "auto",
    backgroundColor: "white"
  }
}));
const useStyles2 = makeStyles({
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

const useStyles3 = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

export default function Home() {
  const classes = useStyles();
  const classes2 = useStyles2();
  const classes3 = useStyles3();

  return (
    <div className={classes.root}>
      <Homenavs />
      <Container component="main" className={classes.main} maxWidth="sm">
        <Card className={classes2.card}>
          <CardContent>
            <Typography
              className={classes2.title}
              color="textSecondary"
              gutterBottom
            >
              Project Manager
            </Typography>
            <Typography variant="h5" component="h2">
              Click below button to go for project manager login
            </Typography>
            <Typography className={classes2.pos} color="textSecondary">
              project manager login / registration
            </Typography>
            <Typography variant="body2" component="p">
              if you have project manager account then login otherwise create
              your account
              <br />
              {'"Welcome Here"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              color="primary"
              className={classes3.button}
            >
              <Link to="/promanlogin" style={{ textDecoration: "none" }}>
                Project Manager Login
              </Link>
            </Button>
          </CardActions>
        </Card>
      </Container>

      <Container component="main" className={classes.main} maxWidth="sm">
        <Card className={classes2.card}>
          <CardContent>
            <Typography
              className={classes2.title}
              color="textSecondary"
              gutterBottom
            >
              Chief Exective Officer
            </Typography>
            <Typography variant="h5" component="h2">
              Click below button to go for CEO login
            </Typography>
            <Typography className={classes2.pos} color="textSecondary">
              CEO login / registration
            </Typography>
            <Typography variant="body2" component="p">
              if you CEO account then login otherwise create your account
              <br />
              {'"Welcome Here"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              color="primary"
              className={classes3.button}
            >
              <Link to="/ceologin" style={{ textDecoration: "none" }}>
                CEO Login
              </Link>
            </Button>
          </CardActions>
        </Card>
      </Container>

      <Container component="main" className={classes.main} maxWidth="sm">
        <Card className={classes2.card}>
          <CardContent>
            <Typography
              className={classes2.title}
              color="textSecondary"
              gutterBottom
            >
              Document Design Manager
            </Typography>
            <Typography variant="h5" component="h2">
              Click below button to go for doument design manager login
            </Typography>
            <Typography className={classes2.pos} color="textSecondary">
              document design manager login / registration
            </Typography>
            <Typography variant="body2" component="p">
              if you have docuement design manager account then login otherwise
              create your account
              <br />
              {'"Welcome Here"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              color="primary"
              className={classes3.button}
            >
              <Link to="/docdesmanlogin" style={{ textDecoration: "none" }}>
                Docuement Design Manager Login
              </Link>
            </Button>
          </CardActions>
        </Card>
      </Container>

      <Container component="main" className={classes.main} maxWidth="sm">
        <Card className={classes2.card}>
          <CardContent>
            <Typography
              className={classes2.title}
              color="textSecondary"
              gutterBottom
            >
              Client User
            </Typography>
            <Typography variant="h5" component="h2">
              Click below button to go for client user login
            </Typography>
            <Typography className={classes2.pos} color="textSecondary">
              client user login / registration
            </Typography>
            <Typography variant="body2" component="p">
              if you have client user account then login otherwise create your
              account
              <br />
              {'"Welcome Here"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              color="primary"
              className={classes3.button}
            >
              <Link to="/cuserlogin" style={{ textDecoration: "none" }}>
                Client User Login
              </Link>
            </Button>
          </CardActions>
        </Card>
      </Container>

      <Container component="main" className={classes.main} maxWidth="sm">
        <Card className={classes2.card}>
          <CardContent>
            <Typography
              className={classes2.title}
              color="textSecondary"
              gutterBottom
            >
              About
            </Typography>
            <Typography variant="h5" component="h2">
              Click below button to check what we are
            </Typography>
            <Typography className={classes2.pos} color="textSecondary">
              about us / contact us
            </Typography>
            <Typography variant="body2" component="p">
              If you wanna know about us and contact info
              <br />
              {'"Welcome Here"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              color="primary"
              className={classes3.button}
            >
              <Link to="aboutus" style={{ textDecoration: "none" }}>
                About us
              </Link>
            </Button>
          </CardActions>
        </Card>
      </Container>

      <CssBaseline />
      <Container
        component="main"
        className={classes.main}
        maxWidth="sm"
      ></Container>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}
