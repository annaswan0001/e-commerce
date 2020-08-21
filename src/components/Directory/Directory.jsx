import React from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom'
import ShopMen from "../../assets/shopMens.png";
import ShopWomens from "../../assets/shopWomens.png";
import "./Directory.scss";

function Directory(props) {
  return (
    <div className="directory">
        <div className="wrapper">
     
      <div
        className="item"
        style={{
          backgroundImage: `url(${ShopMen})`,
        }}
      >
           <Link to="/product-babyboy">Верхняя одежда</Link>
      </div>
      <div
        className="item"
        style={{
          backgroundImage: `url(${ShopWomens})`,
        }}
      >
        <Link to="/product-babygirl">Пиджаки и костюмы</Link>
 
      </div>
      </div>
    </div>
  );
}

Directory.propTypes = {};

export default Directory;
