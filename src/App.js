import logo from "./logo.svg";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import react from "react";

function App() {
  return (
    <react.Fragment>
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    </react.Fragment>
  );
}

export default App;
