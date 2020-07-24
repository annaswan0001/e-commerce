import {all, call} from 'redux-saga/effects'
import userSagas from './User/userSaga'
import productsSaga from './Products/productSagas'

export default function* rootSaga (){

    yield all([call(userSagas), call(productsSaga)])
}