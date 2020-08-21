import actionTypes from "./cartTypes";
import { combineReducers } from "redux";
import getProduct from '../Products/productsReducer'

const initialState = {
  checkoutStatus: {
    checkoutPending: false,
    error: null,
  },
  quantityById: {},
};



function checkoutStatus(state = initialState.checkoutStatus, action) {
  switch (action.type) {
    case actionTypes.CHECKOUT_REQUEST:
      return {
        checkoutPending: true,
        error: null,
      };
    case actionTypes.CHECKOUT_SUCCESS:
      return initialState.checkoutStatus;
    case actionTypes.CHECKOUT_FAILURE:
      return {
        checkoutPending: false,
        error: action.error,
      };
    default:
      return state;
  }
}

function quantityById(state = initialState.quantityById, action) {
  const { payload } = action;
  switch (action.type) {
    case actionTypes.CHECKOUT_SUCCESS:
      return initialState.quantityById;
    case actionTypes.ADD_TO_CART:
      return {
        ...state,
        [payload]: (state[payload] || 0) + 1,
      };
    case actionTypes.REMOVE_FROM_CART:
      const qty = (state[payload] || 0) - 1;
      const copy = { ...state };
      if (qty > 0) copy[payload] = qty;
      else delete copy[payload];
      return copy;
     case actionTypes.ADD_TO_CART_PRODUCT:
      return {
        ...state,
        [payload.id]: (state[payload.id] || 0) + payload.quantity
      };

    default:
      return state;
  }
}

export default combineReducers({
  checkoutStatus,
  quantityById,
});

export function getQuantity(state, productId) {
  return state.quantityById[productId] || 0;

}

export function getAddedIds(state) {
  return Object.keys(state.quantityById);
}

export function getCartQuantity(state) {
  const idArray = getAddedIds(state.cart);
  if (idArray.length > 0) {
    return idArray.reduce((sum, p) => sum + state.cart.quantityById[p], 0);
  } else return 0;
}

export function getCartProducts(state) {
  return getAddedIds(state.cart).map((id) => {
 
    return {
      ...state.products.byId[+id],
      productQuantity: getQuantity(state.cart, id),
    };
  });
}
export function getCart(state) {
  return state.cart;
}

export function getCheckoutError(state) {
  return state.cart.checkoutStatus.error;
}

export function isCheckoutPending(state) {
  return state.cart.checkoutStatus.checkoutPending;
}

export function getTotal(state) {
  return getAddedIds(state.cart)
    .reduce((total, id) => total +   (state.products.byId[+id].productPrice * getQuantity(state.cart, id)), 0)
    .toFixed(2)
}
