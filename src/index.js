import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { LOGIN, LOGOUT, REGISTER, REGISTER_HOSPITAL } from "./constants";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        user: [...state.user, action.payload.user],
        authorized: action.payload.authorized,
      };
    case LOGOUT:
      return state;
    case REGISTER:
      return state;
    case REGISTER_HOSPITAL:
      return state;
    default:
      return state;
  }
};

let initialState = {
  user: [],
  authorized: false,
  role: "",
};

const composedEnhancer = composeWithDevTools(applyMiddleware(ReduxThunk));

let store = createStore(reducer, composedEnhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
