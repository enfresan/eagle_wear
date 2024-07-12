import { createStore, applyMiddleware, } from "redux";
import createSagaMiddleware from "redux-saga";

import reducer from "./Reducers/index";
import mySaga from "./Sagas/index";

// dev tools middleware
const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
export default createStore(reducer, applyMiddleware(sagaMiddleware),reduxDevTools);

// then run the saga
sagaMiddleware.run(mySaga);