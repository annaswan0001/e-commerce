import React from "react";
import PropTypes from "prop-types";
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
          backgroundImage: `url(${ShopWomens})`,
        }}
      >
        <a href="#">PIJAMAS</a>
      </div>
      <div
        className="item"
        style={{
          backgroundImage: `url(${ShopMen})`,
        }}
      >
           <a href="#">LINGERY</a>
      </div>
      </div>
    </div>
  );
}

Directory.propTypes = {};

export default Directory;
