import { compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./Reducer";
import { configureStore } from "@reduxjs/toolkit";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = configureStore({
  reducer: reducer,
  applyMiddleware: thunk,
  composeEnhancers,
});

export default store;
