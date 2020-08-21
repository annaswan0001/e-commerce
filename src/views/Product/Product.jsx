import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import Card from "../../components/Card/Card";
import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductStart } from "../../redux/Products/productsActions";
import "./Product.scss";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import {addToCartStart} from '../../redux/Cart/cartActions'


const mapState = (state) => ({
  product: state.products.product,
});

function CardCustom() {
  const [quantity, setQuantity] = useState(1)
  let { id } = useParams();

  const dispatch = useDispatch();

  const { product } = useSelector(mapState);

  useEffect(() => {
    dispatch(fetchProductStart(id));
  }, []);

  const addProduct = ()=>{
    setQuantity(quantity+1)
  }
  const deleteProduct = ()=>{
    setQuantity(quantity-1)
  }

  return (
    <Container className="product">
      {product.map((item) => {
        if (item.productId === id) {
          const img = item.productImgUrls.map((item) => {
            return {
              original: item,
              thumbnail: item,
            };
          });
          return (
            <Row>
              <Col xs={12} md={6}>
                <ImageGallery items={img} />;
              </Col>
              <Col xs={12} md={6}>
                <h1>{item.productDescription}:</h1>
                <Row>
                  <Col xs={2}>
                    <p>Price</p>
                  </Col>
                  <Col xs={10}>
                    <p className="price">{item.productPrice}&#8380;</p>
                  </Col>
                  {item.productPriceSale && (
                    <>
                      <Col xs={2}>
                        <p>Sale</p>{" "}
                      </Col>
                      <Col xs={10}>
                        <p className="price-sale">
                          {item.productPriceSale}&#8380;
                        </p>
                      </Col>
                    </>
                  )}
                  <Col xs={2}>
                    <p className="size"> Size:</p>
                  </Col>

                  {item.productInventory.map((item, i) => {
                    return (
                      <Col xs={2}>
                        <button className="btn-size" key={item.size}>
                          {item.size}
                        </button>
                      </Col>
                    );
                  })}
                  <Col xs={12} md={10}>
                    <InputGroup>
                      <InputGroup.Prepend>
                       
                         <Button onClick={deleteProduct} variant="outline-secondary">-</Button>
                      </InputGroup.Prepend>
                      <input
                        style={{ width: "55px", paddingLeft: "20px" }}
                        type="text"
                        value={quantity}
                      />
                      <InputGroup.Append>
                      <Button onClick={addProduct}
                        variant="outline-secondary">+</Button>
                      </InputGroup.Append>
                    </InputGroup>
                  </Col>
                </Row>

                <p>
                  <button onClick={()=>{dispatch(addToCartStart({id:item.productId, quantity}));}} className="btn-add ">Add to bag</button>
                </p>
              </Col>
            </Row>
          );
        }
      })}
    </Container>
  );
}

Card.propTypes = {};

export default CardCustom;
