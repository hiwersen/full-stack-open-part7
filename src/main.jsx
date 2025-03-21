import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { NotificationContextProvider } from "./NotificationContext";
import { UserContextProvider } from "./UserContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from "react-router-dom";

const style = {
  backgroundColor: "#f9f9f9",
  position: "relative",
  margin: "auto",
  minWidth: 360,
  maxWidth: 720,
  width: "100%",
  minHeight: "100vh",
  padding: "48px 8px 24px",
};

const queryClient = new QueryClient();

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <div style={style}>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <NotificationContextProvider>
            <Router>
              <App />
            </Router>
          </NotificationContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>,
);
