import {combineReducers} from 'redux'
import userReducer from './User/userReducer'
import productReducer from './Products/productsReducer'
import cartReducer from './Cart/cartReducer'
export default combineReducers({
    user: userReducer,
    products: productReducer,
    cart :cartReducer
})