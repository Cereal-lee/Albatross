import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import rootReducer from "./modules/index";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";
import logger from "redux-logger";
import { check, tempSetUser } from "modules/user";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, ReduxThunk))
);

function loadUser() {
  try {
    const user = localStorage.getItem("user");
    if (!user || JSON.parse(user) === null) return;

    store.dispatch(tempSetUser(JSON.parse(user)));
    store.dispatch(check());
  } catch (error) {
    console.log("error");
  }
}

loadUser();

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
