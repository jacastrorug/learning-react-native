import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";

import "./css/index.css";
import "./css/iconos.css";
import App from "./components/App";

import reducers from "./reducers";

const store = createStore(
  reducers, // son todos los reducers
  {}, // estado inicial
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
