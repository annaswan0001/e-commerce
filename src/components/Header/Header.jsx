import React from "react";
import logo from "../../assets/logo.png";
import PropTypes from "prop-types";
import "./Header.scss";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/utils";
import { connect } from "react-redux";


function Header({ currentUser = null, ...rest }) {
  return (
    <header className="header">
      <div className="wrapper">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <div className="callToActions">
          {currentUser && (
            <ul>
              <li>
                <span onClick={()=>auth.signOut()}>
                Logout
                </span>
            
              </li>
            </ul>
          )}

          {!currentUser && (
            <ul>
              <li>
                <Link to="/registration">register</Link>
              </li>
              <li>
                <Link to="/login">login</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}

// Header.PropTypes = {

// }

const mapStatetoProps = (state) =>({
  currentUser: state.user.currentUser
})

export default connect(mapStatetoProps, null)(Header);
