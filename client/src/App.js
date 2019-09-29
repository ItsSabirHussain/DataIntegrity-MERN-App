import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Home from "./components/home.js";
import ProManLogin from "./components/admin";
import CUserLogin from "./components/cuserlogin";
import CEOLogin from "./components/emplogin";
import CEOReg from "./components/ceoreg";
import ProManReg from "./components/promanreg";
import CUserReg from "./components/cuserreg";

import CEODashboard from "./components/employee/empdashboard";
import ProManDashboard from "./components/admin/admindashboard";
import CUserDashboard from "./components/cuserdashboard/cuserdashboard";

function App({ history }) {
  return (
    <div>
      <Router>
        <Switch history={history}>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/promanlogin" component={ProManLogin} />
          <Route exact path="/cuserlogin" component={CUserLogin} />
          <Route exact path="/ceologin" component={CEOLogin} />
          <Route exact path="/promanreg" component={ProManReg} />
          <Route exact path="/cuserreg" component={CUserReg} />
          <Route exact path="/ceoreg" component={CEOReg} />
          <Route path="/ceodashboard" component={CEODashboard} />
          <Route path="/promandashboard" component={ProManDashboard} />
          <Route path="/cuserdashboard" component={CUserDashboard} />

          <Redirect to="/404" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
