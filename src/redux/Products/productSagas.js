import { put, call, all, takeLatest } from "redux-saga/effects";
import productsTypes from "./productsTypes";
import {handleAddProducts, handleFetchProducts, handleDeleteProduct} from './productsHelpers'
import {auth} from '../../firebase/utils'
import { setProducts, fetchProductsStart } from "./productsActions";

export function* addProducts({
  payload: { productCategory, productName, ProductImageURL, productPrice },
}) {
    const timeStamp = new Date()
    try {
        yield handleAddProducts({
            productCategory, productName, ProductImageURL, productPrice ,
            productAdminUserUID : auth.currentUser.uid,
            createdDate : timeStamp
        })
        yield put(fetchProductsStart())
    } catch (error) {
        console.log(error)
    }
}


export function* onAddProductsStart() {
  yield takeLatest(productsTypes.ADD_NEW_PRODUCTS_START, addProducts);
}

//fetchProducts

function* fetchProducts(){
  try {

    const products = yield handleFetchProducts();
    yield put(setProducts(products))
  } catch (error) {
    console.log(error)
  }
}

export function* onFetchProductsStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts);
}
// DELETE PRODUCT


export function* deleteProduct({ payload }) {
  try {
    yield console.log(payload)
    yield handleDeleteProduct(payload);
    yield put (fetchProductsStart());

  } catch (err) {
    // console.log(err);
  }
}

function* onDeleteProduct(){
  yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct)
}

export default function* productSaga() {
  yield all([call(onAddProductsStart),call(onFetchProductsStart), call(onDeleteProduct)]);
}
