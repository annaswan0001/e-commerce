import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import Button from "../../components/Forms/Button/Button";

function CardCustom({
  productName,
  productImgUrls,
  productPrice,
  documentId,
  productPriceSale,
  productInventory,
  productCategory,
  onAddtoCard,
  buttonText,
  children,
}) {
  return (
    <Card style={{ width: "100%" }}>
      {/* {console.log(props)} */}
      <Card.Img variant="top" src={productImgUrls[0]} />
      <Card.Body>
        <Card.Title>{productName}</Card.Title>
        {productInventory ? (
          <Card.Title>
            Size:{productInventory.map((item, index) => {
              return (
                <button key={item.size}className="bnt btn-transparent mr-2">
                  {item.size}
                </button>
              );
            })}
          </Card.Title>
        ) : null}
        <Card.Text>Цена: ₼{productPrice}</Card.Text>
        {productPriceSale > 1 ? (
          <Card.Text className="text-danger">
            Цена распродажи: ₼{productPriceSale}
          </Card.Text>
        ) : (
          <Card.Text>Новая коллекция</Card.Text>
        )}
        {children}
      </Card.Body>
    </Card>
  );
}

Card.propTypes = {};

export default CardCustom;
