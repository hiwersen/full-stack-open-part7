import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../hooks";
import Nav from "./Nav";
import Header from "./Header";
import Footer from "./Footer";
import { dynamicWidth, center, styleInitial } from "../styles";

const ProtectedRoute = ({ loading }) => {
  const user = useUser();

  if (loading)
    return (
      <div style={center}>
        <span style={styleInitial}>Loading credentials...</span>
      </div>
    );

  if (!user) return <Navigate to="/login" replace />;

  const style = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    minHeight: "100vh",
  };

  return (
    <div style={style}>
      <div>
        <Nav />
        <div style={dynamicWidth}>
          <Header />
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProtectedRoute;
