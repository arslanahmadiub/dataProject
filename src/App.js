import React from "react";
import SignIn from "./Components/SignIn";
import Admin from "./Components/Admin";
import { Route, Switch, Redirect } from "react-router-dom";

const App = () => {
  return (
    <Switch>
      <Route exact path="/">
        <SignIn />
      </Route>
      <Route
        exact
        path="/admin"
        render={(props) => {
          if (
            sessionStorage.getItem("userData") === null ||
            sessionStorage.getItem("role") === "user"
          ) {
            return <SignIn to="/" />;
          } else {
            return <Admin to="/admin" />;
          }
        }}
      />
      <Route
        exact
        path="/user"
        render={(props) => {
          if (
            sessionStorage.getItem("userData") === null ||
            sessionStorage.getItem("role") === "admin"
          ) {
            return <SignIn to="#/" />;
          } else {
            return <Admin to="#/user" />;
          }
        }}
      />
      <Route path="*">
        <Redirect to="/" />
      </Route>
      {/* <Route exact path="/admin">
        <Admin />
      </Route>
      <Route exact path="/user">
        <Admin />
      </Route> */}
    </Switch>
  );
};

export default App;
