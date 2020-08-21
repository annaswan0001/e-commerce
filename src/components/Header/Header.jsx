import React from "react";
import logo from "../../assets/logo.png";
import PropTypes from "prop-types";
import "./Header.scss";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/utils";
import { useSelector, useDispatch } from "react-redux";
import { signOutStart } from "../../redux/User/userActions";
import { getCartQuantity } from "../../redux/Cart/cartReducer";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  productQuantity: getCartQuantity(state) || 0,
});

function Header({ ...rest }) {
  const { currentUser, productQuantity } = useSelector(mapState);
  const dispatch = useDispatch();
  const signOut = () => dispatch(signOutStart());

  return (
    <header className="header">
      <div className="wrapper">
        <div className="logo">
          <Link to="/">
            {console.log(productQuantity)}
            <h1>Anna Swan</h1>
            <h2>Your favorite women's clothes</h2>
          </Link>
        </div>

        <div className="callToActions">
          {currentUser && (
            <ul>
              <li>
                <span onClick={signOut}>Logout</span>
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
              <li>
                {" "}
                <Link to="/shopping-cart">
                  Корзина:{" "}
                  <span className="shopping-cart">{productQuantity} шт. </span>
                </Link>{" "}
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
