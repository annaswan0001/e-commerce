import React from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom'
import ShopMen from "../../assets/shopMens.jpg";
import ShopWomens from "../../assets/shopWomens.jpg";
import "./Directory.scss";

function Directory(props) {
  return (
    <div className="directory">
        <div className="wrapper">
      <div
        className="item"
        style={{
          backgroundImage: `url(https://shoppershook.com/wp-content/uploads/2019/12/1-6T-Toddler-Kid-Baby-Girl-Dress-Solid-Ruffle-Collar-Long-Seeve-Dress-Outfit-Sundress-With_0.jpg)`,
        }}
      >
        <Link to="/shop-babygirl">Одежда для девочек</Link>
 
      </div>
      <div
        className="item"
        style={{
          backgroundImage: `url(https://img.ppwebstatic.com/origin/product/006655000493/5da82b160f15a.jpg/350x350)`,
        }}
      >
           <Link to="/shop-babyboy">Одеджа для мальчиков</Link>
      </div>
      </div>
    </div>
  );
}

Directory.propTypes = {};

export default Directory;
