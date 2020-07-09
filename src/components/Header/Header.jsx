import React from "react";
import logo from "../../assets/logo.png";
import PropTypes from "prop-types";
import "./Header.scss";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <div className="wrapper">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <div className="callToActions">
          <ul>
            <li>
              <Link to="/registration">register</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

// Header.PropTypes = {

// }

export default Header;
