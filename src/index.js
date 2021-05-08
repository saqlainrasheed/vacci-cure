import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

//Redux
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//reducer
import reducer from "./reducers";

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
