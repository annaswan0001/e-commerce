import {createStore,applyMiddleware} from "redux"
import logger from 'redux-logger'
import rootReducer from './rootReducer'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./rootSaga"

const sagaMiddleware = createSagaMiddleware()
let middlewares = [logger, thunk, sagaMiddleware]
const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga )
export default store;
