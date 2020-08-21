import { put, call, all, takeLatest } from "redux-saga/effects";
import productsTypes from "./productsTypes";
import {
  handleAddProducts,
  handleFetchProducts,
  handleDeleteProduct,
  handleFetchProduct,

} from "./productsHelpers";
import { auth,  handleUploadProductPhoto } from "../../firebase/utils";
import { setProducts, setProduct,fetchProductsStart } from "./productsActions";

export function* addProducts({
  payload: {
    productCategory,
    productName,
    ProductImageURL,
    productPrice,
    productColor,
    productInventory,
    productId,
    productPriceSale,
    productDescription
  },
}) {
  const timeStamp = new Date();
  try {
    const productImgUrls =  yield handleUploadProductPhoto(ProductImageURL)
    yield handleAddProducts({
          productImgUrls,
          productId,
          productCategory,
          productName,
          productPrice,
          productColor,
          productInventory,
          productAdminUserUID: auth.currentUser.uid,
          createdDate: timeStamp,
          productPriceSale,
          productDescription
        }, ProductImageURL);
        yield put(fetchProductsStart());
  } catch (error) {
    console.log(error);
  }
 
  
  // try {
  //   yield handleAddProducts({
  //     productId,
  //     productCategory,
  //     productName,
  //     productPrice,
  //     productColor,
  //     productInventory,
  //     productAdminUserUID: auth.currentUser.uid,
  //     createdDate: timeStamp,
  //     productPriceSale,
  //     productDescription
  //   }, ProductImageURL);
  //   yield put(fetchProductsStart());
  // } catch (error) {
  //   console.log(error);
  // }
}

export function* onAddProductsStart() {
  yield takeLatest(productsTypes.ADD_NEW_PRODUCTS_START, addProducts);
}

//fetchProducts

function* fetchProducts() {
  try {
    const products = yield handleFetchProducts();
    yield put(setProducts(products));
  } catch (error) {
    console.log(error);
  }
}

export function* onFetchProductsStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts);
}

//FETCH 1 product
function* fetchProduct({payload}) {
  try {
    const product = yield handleFetchProduct(payload);
    yield put(setProduct(product));
  } catch (error) {
    console.log(error);
  }
}

export function* onFetchProductStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCT_START, fetchProduct);
}
// DELETE PRODUCT

export function* deleteProduct({ payload }) {
  try {
    yield console.log(payload);
    yield handleDeleteProduct(payload);
    yield put(fetchProductsStart());
  } catch (err) {
    // console.log(err);
  }
}

function* onDeleteProduct() {
  yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct);
}

export default function* productSaga() {
  yield all([
    call(onAddProductsStart),
    call(onFetchProductsStart),
    call(onDeleteProduct),
    call(onFetchProductStart)
  ]);
}
