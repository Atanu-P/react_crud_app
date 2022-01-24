import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../logo";

class Navbar extends Component {
  state = {};

  render() {
    return (
      <div className="navbar">
        <nav className="nav-extended indigo darken-2">
          <div className="nav-content">
            <Link to="/">
              <span className="nav-title">React</span>
              <img src={logo} className="App-logo" alt="logo" />
              <span className="nav-title">Firebase </span>
            </Link>
            <Link
              to="/display"
              className="btn-floating btn-large halfway-fab pink waves-effect left">
              <i className="material-icons">apps</i>
            </Link>

            <NavLink
              to="/addrecipe"
              className="btn-floating btn-large halfway-fab pink waves-effect">
              <i className="material-icons">add</i>
            </NavLink>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
