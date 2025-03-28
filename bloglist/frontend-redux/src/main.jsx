import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </div>
    ,
  </StrictMode>,
);
