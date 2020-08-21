import actionTypes from "./cartTypes";

export const addToCartStart = (product) => (dispatch) => {
  console.log("add to cart");
  dispatch(addToCartProduct(product));
};

export const addToCartProduct = (product) => ({
  type: actionTypes.ADD_TO_CART_PRODUCT,
  payload: product,

});

export const addToCart = (product) => ({
  type: actionTypes.ADD_TO_CART,
  payload: product,

});

export function removeFromCart(id) {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: id,
  };
}
