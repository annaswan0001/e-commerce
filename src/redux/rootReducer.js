import {combineReducers} from 'redux'
import userReducer from './User/userReducer'
import productReducer from './Products/productsReducer'
export default combineReducers({
    user: userReducer,
    products: productReducer
})