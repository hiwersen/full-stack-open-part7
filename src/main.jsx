import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import { UserContextProvider } from "./UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";

const queryClient = new QueryClient();

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <Provider store={store}>
            <Router>
              <App />
            </Router>
          </Provider>
        </UserContextProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>,
);
