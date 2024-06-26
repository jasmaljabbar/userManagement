import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./intercepter/axios";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userStore from "./ReduxStore/ReduxStore";

const store = configureStore({
  reducer: { user: userStore },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
