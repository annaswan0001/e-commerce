import React from "react";
import logo from "../../assets/logo.png";
import PropTypes from "prop-types";
import "./Header.scss";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/utils";
import { useSelector, useDispatch } from "react-redux";
import { signOutStart } from "../../redux/User/userActions";

const mapState = (state) =>({
  currentUser: state.user.currentUser
})


function Header({  ...rest }) {
  const {currentUser} = useSelector(mapState)
  const dispatch = useDispatch()
  
  const signOut = ()=>dispatch(signOutStart())
  
  return (
    <header className="header">
      <div className="wrapper">
        <div className="logo">
          <Link to="/">
            {/* <img src={logo} alt="logo" /> */}
            <h1>Sugar baby</h1>
            <h4>Твой любимый магазин детской одежды</h4>
          </Link>
        </div>

        <div className="callToActions">
          {currentUser && (
            <ul>
              <li>
                <span onClick={signOut}>
                Logout
                </span>
                
            
              </li>
              <li>
                <Link to="/dashboard">My account</Link>
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


export default Header;
