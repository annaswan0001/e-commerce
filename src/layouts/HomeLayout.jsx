import React from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from '../components/Footer/Footer'
function MainLayout(props) {
  return (
    <>
      <Header {...props}/>
      {console.log(props)}
      {props.children}
      <Footer/>
    </>
  );
}

MainLayout.propTypes = {};

export default MainLayout;
