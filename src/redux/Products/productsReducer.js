
import productsTypes from './productsTypes'
import {combineReducers} from 'redux'


function products(state, action) {
    switch (action.type) {
      case productsTypes.ADD_TO_CART:
        return {
          ...state,
          productInventory: state.productInventory - 1,
        }
      case productsTypes.REMOVE_FROM_CART:
        return {
          ...state,
          productInventory: state.productInventory + 1,
        }
      default:
        return state
    }
  }
function byId(state = {}, action) {
    switch (action.type) {
      case productsTypes.SET_PRODUCTS:
      // console.log(action.payload)
        return {
          ...state,
          ...action.payload.reduce((obj, product) => {
            obj[product.productId] = product
            return obj
          }, {}),
        }
      default:
        const {payload}  = action
        if (payload) {
          return {
            ...state,
            [payload]: products(state[payload], action),
          }
        }
        return state
    }
  }
  
  function visibleIds(state = [], action) {
    switch (action.type) {
      case productsTypes.SET_PRODUCTS:
        return action.payload.map(product => product.productId)
      default:
        return state
    }
  }

  function product(state = [], action) {
    switch (action.type) {
      case productsTypes.SET_PRODUCT:
        return action.payload
      default:
        return state
    }
  }

  
  
  export default combineReducers({
    byId,
    visibleIds,
    product
  })
  
  export function getProduct(state, id) {
    console.log("state", state)
    return state.byId[+id]
  }
  
  export function getVisibleProducts(state) {
    return state.visibleIds.map(id => getProduct(state, id))
  }
  