import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { Reducer } from "./Reducer";
import userReducer from "./userSlice";

const rootreducer = combineReducers({
  user: Reducer,
  userIdReducer: userReducer,
});
const Store = configureStore({
  reducer: rootreducer,
  middleware: [thunk, logger],
});
export default Store;
