// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store.jsx";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
    <ToastContainer theme='colored'/>
      </Provider>
    </BrowserRouter>
  // </React.StrictMode>
);
