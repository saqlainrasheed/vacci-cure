import Login from "./components/Forms/Login";
import React from "react";
import logo from "./images/logo.png";
import Homepage from "./components/Homepage/Index";
import Hospital from "./components/Hospital/Index";
import Admin from "./components/Admin/Index";
import Parents from "./components/Parents/Index";
import AddChild from "./components/Forms/AddChild";
import Registration from "./components/Forms/Registration";
import HosRegistration from "./components/Forms/HosRegistration";
// import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component="Homepage">
            <Homepage logo={logo} />
          </Route>
          <Route path="/parents" exact>
            <Parents logo={logo} />
          </Route>
          <Route path="/admin">
            <Admin logo={logo} />
          </Route>
          <Route path="/hospital" exact>
            <Hospital logo={logo} />
          </Route>
          <Route path="/login" exact>
            <Login logo={logo} />
          </Route>
          <Route path="/register" exact>
            <Registration logo={logo} />
          </Route>
          <Route path="/register-hospital" exact>
            <HosRegistration logo={logo} />
          </Route>
          <Route path="/add-child" exact>
            <AddChild logo={logo} />
          </Route>
          <Route path="/logout" exact>
            <Homepage logo={logo} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
