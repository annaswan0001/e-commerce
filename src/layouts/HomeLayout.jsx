import React from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from '../components/Footer/Footer'
function HomeLayout(props) {
  return (
    <>
      <Header {...props}/>
      {props.children}
      <Footer/>
    </>
  );
}

HomeLayout.propTypes = {};

export default HomeLayout;
