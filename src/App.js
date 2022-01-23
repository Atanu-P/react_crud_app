import logo from "./logo.svg";
import { Route, Switch, Redirect } from "react-router-dom";
import Display from "./components/display";
import "./App.css";
import react from "react";

function App() {
  return (
    <react.Fragment>
      <div className="App">
        <Switch>
          <Route exact path="/display" component={Display} />
          <Redirect from="/" exact to="/display" />
        </Switch>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </div>
    </react.Fragment>
  );
}

export default App;
