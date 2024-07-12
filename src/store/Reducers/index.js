import { combineReducers } from "redux";
import LoginReducer from "../Reducers/LoginReducer";
import ProductsReducer from "../Reducers/ProductsReducer";

export default combineReducers({ LoginReducer, ProductsReducer });