import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.svg";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <div className="navbar">
        <nav className="nav-extended indigo darken-2">
          <div className="nav-content">
            <Link to="/">
              <span className="nav-title">React + Firebase </span>
            </Link>

            <Link
              to="/addrecipe"
              className="btn-floating btn-large halfway-fab pink">
              <i className="material-icons">add</i>
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
