
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import rootSaga from './Sagas';
import allReducers from "./Reducers";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(allReducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

store.subscribe(() => console.log(store.getState()));

export default store;