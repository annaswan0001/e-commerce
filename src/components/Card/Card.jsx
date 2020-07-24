import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import Button from "../../components/Forms/Button/Button";

function CardCustom({ productName, ProductImageURL, productPrice, documentId }) {

  return (
    <Card style={{ width: "100%" }}>
        {/* {console.log(props)} */}
      <Card.Img variant="top" src={ProductImageURL} />
      <Card.Body>
        <Card.Title>{productName}</Card.Title>
        <Card.Title>Size:65</Card.Title>
        <Card.Text>
        Цена: {productPrice}
        </Card.Text>
        <Card.Text className="text-danger">
        Цена распродажи: ₼{productPrice}
        </Card.Text>
       
        <Button variant="primary">Купить</Button>
      </Card.Body>
    </Card>
  );
}

Card.propTypes = {};


export default CardCustom;
