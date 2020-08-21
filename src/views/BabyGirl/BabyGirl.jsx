import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Card from "../../components/Card/Card";
import { fetchProductsStart } from "../../redux/Products/productsActions";
import "./BabyGirl.scss";
import cartTypes from "../../redux/Cart/cartTypes";
import { addToCartStart } from "../../redux/Cart/cartActions";
import Button from "../../components/Forms/Button/Button";

// const mapState = ({ products, cart }) => ({
//   productsData: products.products,
//   productQuantity: cart.productQuantity,
// });

const mapState = (state) => ({
  productsData: state.products.visibleIds.map((id) => state.products.byId[id]),
});

function BabyGirl(props) {
  const dispatch = useDispatch();

  const { productsData } = useSelector(mapState);
  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  const onAddtoCard = useCallback(
    (quantity) => {
      dispatch(addToCartStart(quantity));
    },
    [addToCartStart]
  );

  return (
    <Container className="babyGirl">
      <h1>Одежда для младенцев девочек:</h1>
      {/* Stack the columns on mobile by making one full-width and the other half-width */}
      <Row>
    
        {productsData &&
          productsData.map((product, index) => {
            if (product.productCategory === "womens") {
              return (
                <Col xs={12} sm={6} md={4} key={product.documentId}>
                  <Link to={`product/${product.productId}`}>
                    <Card {...product}>
                      <Button
                        onClick={() => onAddtoCard(product.documentId)}
                        variant="primary"
                      >
                        Просмотреть
                      </Button>
                    </Card>
                  </Link>
                </Col>
              );
            }
          })}
      </Row>
    </Container>
  );
}

BabyGirl.propTypes = {};

export default BabyGirl;
