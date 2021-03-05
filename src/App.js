import React from "react";
import SignIn from "./Components/SignIn";
import Admin from "./Components/Admin";
import { Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Switch>
      <Route exact path="/">
        <SignIn />
      </Route>
      <Route exact path="/admin">
        <Admin />
      </Route>
    </Switch>
  );
};

export default App;
