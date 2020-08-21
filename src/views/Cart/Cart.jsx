import React, { useState } from "react";
import { getCartProducts , getTotal} from "../../redux/Cart/cartReducer";
import "./Cart.scss";
import { useSelector, useDispatch } from "react-redux";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { addToCart, removeFromCart } from "../../redux/Cart/cartActions";

const mapState = (state) => ({
  products: getCartProducts(state),
  totalPrice:getTotal(state)
});

function Cart(props) {

  const { products ,totalPrice} = useSelector(mapState);
  const dispatch = useDispatch();

  return (
    <div className="cart">
     
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product Img</th>
            <th scope="col">Product name</th>
            <th scope="col">Product size</th>
            <th scope="col">Quantity</th>
            <th scope="col">Product Price</th>
          </tr>
        </thead>
        <tbody>
          {products &&  products.map((product, i) => {
            return (
              <tr>
                <th scope="row">{i + 1}</th>
                <td>
                  {/* <img
                    style={{ width: "100px" }}
                    src={product.productImgUrls[0]}
                    alt=""
                  /> */}
                </td>
                <td>{product.productName}</td>
                <th scope="col">{product.productSize}</th>
                <td>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <Button
                        onClick={() =>
                          dispatch(removeFromCart(product.productId))
                        }
                        variant="outline-secondary"
                      >
                        -
                      </Button>
                    </InputGroup.Prepend>
                    <input
                      style={{ width: "55px", paddingLeft: "20px" }}
                      type="text"
                      value={product.productQuantity}
                    />
                    <InputGroup.Append>
                      <Button
                        onClick={() => dispatch(addToCart(product.productId))}
                        variant="outline-secondary"
                      >
                        +
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </td>
                <td>
                  <p>{product.productPrice}</p>
                  <p>{product.productPriceSale}</p>
                </td>
              </tr>
            );
          })}
         <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>Итог</td>
        <td>{totalPrice} грн</td>
          </tr>
        </tbody>
      </table>
      
    </div>
  );
}

Cart.propTypes = {};

export default Cart;
