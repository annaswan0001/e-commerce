import React from "react";
import PropTypes from "prop-types";
import Footer from '../components/Footer/Footer'
import Header from "../components/Header/Header";
function MainLayout(props) {
  return (
    <>
      <Header {...props}/>
      {console.log(props)}
      <div className="main">
        {props.children}
    
      </div>
      <Footer/>
     
    </>
  );
}

MainLayout.propTypes = {};

export default MainLayout;
