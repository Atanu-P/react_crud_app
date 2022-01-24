import logo from "./logo.svg";
import { Route, Switch, Redirect } from "react-router-dom";
import Display from "./components/display";
import AddRecipe from "./components/addRecipe";
import EditRecipe from "./components/editRecipe";
import Navbar from "./navBar";
import "./App.css";
import react from "react";

function App() {
  return (
    <react.Fragment>
      <div className="App">
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/display" component={Display} />
          <Route exact path="/addrecipe" component={AddRecipe} />
          <Route exact path="/editrecipe" component={EditRecipe} />
          <Redirect from="/" exact to="/display" />
        </Switch>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </div>
    </react.Fragment>
  );
}

export default App;
