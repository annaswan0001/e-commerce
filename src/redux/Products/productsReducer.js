
import productsTypes from './productsTypes'

const initialState = {
products:[]
}

export default (state = initialState, action) => {
    switch (action.type) {

    case productsTypes.SET_PRODUCTS:
        return { ...state, products: action.payload }

    default:
        return state
    }
}
