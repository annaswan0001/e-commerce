import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import Card from "../../components/Card/Card";
import { fetchProductsStart } from "../../redux/Products/productsActions";
import "./BabyGirl.scss";

const mapState = ({ products }) => ({
  productsData: products.products,
});

function BabyGirl(props) {
  const dispatch = useDispatch();

  const { productsData } = useSelector(mapState);
  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);
  return (
    <Container className="babyGirl">
      <h1>Одежда для младенцев девочек:</h1>
      {/* Stack the columns on mobile by making one full-width and the other half-width */}
      <Row>
        {productsData &&
          productsData.map((product, index) => {
            if (product.productCategory === "womens") {
              return (
                <Col xs={12} sm={6} md={4}>
                  <Card {...product} />
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
