import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Route, Switch } from "react-router-dom";
import Main from "./main";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PolicyIcon from "@material-ui/icons/Policy";
import PeopleIcon from "@material-ui/icons/People";
import NotificationImportantIcon from "@material-ui/icons/NotificationImportant";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import MenuItem from "@material-ui/core/MenuItem";
import UploadProData from "./uploadprodata";
import CostOfPro from "./costofpro";
import ClientsReq from "./clientsreq";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Jumbotron } from "react-bootstrap";
import Notifications from "./notifications";
import Projects from "./projects";
import Updations from "./updations";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
}));

export default function ProManDashboard(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const [proman, setProman] = React.useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (localStorage.getItem("promanTokken")) {
      setProman(localStorage.getItem("promanID"));
    } else {
      props.history.push("/promanlogin");
    }
  });

  const onClick = e => {
    e.preventDefault();
    localStorage.removeItem("promanTokken");
    localStorage.removeItem("propmanID");
    props.history.push("/promanlogin");
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {"PM Dashboard with ID" + proman}
          </Typography>
          <IconButton onClick={onClick} color="inherit">
            <Badge color="secondary">
              <ExitToAppIcon fontSize="large" />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <div>
            <ListItem button component={Link} to="/promandashboard">
              <ListItemIcon>
                <DashboardIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/promandashboard/uploadprodata"
            >
              <ListItemIcon>
                <NotificationImportantIcon fontSize="large" />
              </ListItemIcon>

              <ListItemText primary="Analysis Data" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/promandashboard/notifications"
            >
              <ListItemIcon>
                <PeopleIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Notifications" />
            </ListItem>
            <ListItem button component={Link} to="/promandashboard/projects">
              <ListItemIcon>
                <PeopleIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Projects" />
            </ListItem>
            <ListItem button component={Link} to="/promandashboard/updation">
              <ListItemIcon>
                <PermIdentityIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Updations" />
            </ListItem>
          </div>
        </List>
        <Divider />
      </Drawer>

      <Switch>
        <Route exact path="/promandashboard" component={Main} />
        <Route
          exact
          path="/promandashboard/uploadprodata"
          component={UploadProData}
        />
        <Route
          exact
          path="/promandashboard/analysisdata"
          component={CostOfPro}
        />
        <Route exact path="/promandashboard/clientreq" component={ClientsReq} />
        <Route exact path="/promandashboard/projects" component={Projects} />

        <Route
          exact
          path="/promandashboard/notifications"
          component={Notifications}
        />
        <Route exact path="/promandashboard/updation" component={Updations} />
      </Switch>
    </div>
  );
}
