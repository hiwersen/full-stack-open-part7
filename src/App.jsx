import React from "react";
import Notification from "./components/Notification";
import Auth from "./components/Auth";
import Nav from "./components/Nav"
import Home from "./components/Home";
import Users from "./components/Users"
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Routes, Route
 } from "react-router-dom"

const App = () => {
  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <Auth />
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Users" element={<Users />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
